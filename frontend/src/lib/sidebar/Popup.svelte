<script lang="ts">
	import { goto } from "$app/navigation";
	import Spinner from "$lib/global/Spinner.svelte";
	import { clickOutside } from "$lib/utils/clickOutside.js";
	import { channelStorage } from "$lib/utils/localStorage";
	import { createEventDispatcher } from "svelte";
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

	const handleResultClick = (username: string) => {
		const privateChannels = channelStorage.getItem("private");
		const result = privateChannels.find((val) => val.username == username);

		if (!result) {
			// TODO Create Channel
			return;
		}

		// TODO Fix this shit, figure ot  a way to rid it.
		goto(`/chat/${result.channelId}?user=${result.username}&type=user`);
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
					<div class="results__user" on:click={() => handleResultClick(user?.username)}>
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
