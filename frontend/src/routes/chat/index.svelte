<script lang="ts">
	import { fetchUsersList } from "$lib/api/user-api";
	import UserPreview from "$lib/chat/UserPreview.svelte";
	import Loader from "$lib/global/Loader.svelte";
	import Search from "$lib/sidebar/Search.svelte";
	import { allUsers, onlineUsers } from "$lib/store/users";

	let searchValue: string;
</script>

<section class="wrapper">
	<Search value={searchValue} color="#202225" />

	<div class="online">
		<span>Online - {$onlineUsers.length}</span>

		{#if $allUsers.state == "loading"}
			<Loader />
		{:else}
			<div class="online__users">
				{#each $allUsers.data as user}
					<hr />
					<UserPreview
						username={user.username}
						status={$onlineUsers.find((users) => users.username == user.username) ? "Online" : "Offline"} />
				{/each}
			</div>
		{/if}
	</div>
</section>

<style lang="scss">
	section {
		display: grid;
		grid-template-rows: auto 1fr auto;
		width: 100%;
		height: 100%;
		padding: 1.5rem 2rem;
	}

	.online {
		margin-top: 1rem;

		&__users {
			display: flex;
			flex-direction: column;
		}

		span {
			font-weight: 500;
			margin-bottom: 0.5rem;
			display: block;
		}

		hr {
			background-color: rgba(255, 255, 255, 0.096);
			border-radius: 10px;
			height: 1px;
			border: none;
			width: 100%;
			margin: 0;
		}
	}
</style>
