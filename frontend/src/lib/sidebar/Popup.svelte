<script lang="ts">
	import { goto } from "$app/navigation";
	import { session } from "$app/stores";
	import Spinner from "$lib/global/Spinner.svelte";
	import { privateChannels } from "$lib/store/channel";
	import { clickOutside } from "$lib/utils/clickOutside";
	import { log } from "@utils/logger";
	import Search from "./Search.svelte";

	export let active = false;
	let searchValue: string = "";
	let usersResult: any[] = [];

	const loadFriends = async () => {
		const response = await fetch(`http://localhost:5000/user`, { credentials: "include" });
		const result = await response.json();

		usersResult = result;
		return result;
	};

	const handleResultClick = async (username: string, id: number) => {
		const channel = $privateChannels.data.find((channels) => channels.users.username === username);

		if (!channel) {
			log.debug("Private channel not found... Attempting to createa.");

			const response = await fetch("http://localhost:5000/channel", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					type: "private",
					senderId: $session.user.id,
					receiverId: id
				}),
				credentials: "include"
			});

			const result = await response.json();
			if (!response.ok) return log.error(result);

			// Update local state
			privateChannels.update((channels) => {
				channels.data.push({ id: result.id, users: { username, id } });
				return channels;
			});

			log.info("Private channel created sucessfully, redirecting..", result);
			active = false;
			goto(`/chat/${result.id}?user=${username}&type=user`);
			return;
		}

		// // TODO Fix this shit, figure ot  a way to rid it.
		active = false;
		goto(`/chat/${channel.id}?user=${channel.users.username}&type=user`);
	};

	$: filteredResults = usersResult.filter((users) =>
		users?.username?.toLowerCase().startsWith(searchValue.toLowerCase())
	);
</script>

{#if active}
	<div class="popup" name="popup" use:clickOutside on:clickOutside>
		<header>
			<h4>Select Friend</h4>
			<p>Choose a teammate to chat</p>
		</header>

		<Search placeholder="Type the username of a teammate" color="var(--color-black-s3)" bind:value={searchValue} />

		<div class="results">
			{#await loadFriends()}
				<Spinner />
			{:then users}
				{#each searchValue ? filteredResults : users as user}
					<div class="results__user" on:click={() => handleResultClick(user.username, user.id)}>
						<img
							src="https://avatars.dicebear.com/api/initials/{user?.username || 'a'}.svg?r=50&fontSize=40"
							alt="User Avatar" />
						<span>{user?.username}</span>
					</div>
				{/each}
			{/await}
		</div>
	</div>
{/if}

<style lang="scss">
	.popup {
		position: absolute;
		display: flex;
		z-index: 100;
		gap: 0.9rem;
		flex-direction: column;
		top: 30px;
		left: 100%;
		width: 460px;
		height: auto;
		max-height: 360px;
		padding: 1rem;
		background-color: var(--color-black-s1);
		border-radius: 7px;
		box-shadow: 0 0 0 1px rgba(32, 34, 37, 0.6), 0 2px 10px 0 rgba(0, 0, 0, 0.2);
	}

	.results {
		display: flex;
		flex-direction: column;
		overflow-y: auto;

		&__user {
			display: flex;
			padding: 6px 8px;
			border-radius: 7px;
			align-items: center;
			gap: 1em;

			&:hover {
				background-color: rgba(79, 84, 92, 0.3);
				cursor: pointer;
			}
		}

		img {
			width: 25px;
			height: 25px;
			border-radius: 50%;
		}
	}

	header {
		p {
			font-size: var(--fs-sm);
			margin-top: 3px;
			color: #b9bbbe;
		}
	}
</style>
