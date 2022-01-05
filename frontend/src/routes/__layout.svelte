<script lang="ts">
	import { browser } from "$app/env";

	import { session } from "$app/stores";
	import { loaderMessages } from "$lib/constants";
	import ChatNotifcation from "$lib/global/ChatNotifcation.svelte";
	import Spinner from "$lib/global/Spinner.svelte";
	import { socket } from "$lib/socket";
	import { notifcations } from "$lib/stores";
	import { fetchFriendsList, fetchUsersList } from "$lib/utils/requestUtils";
	import { onMount } from "svelte";
	import { fade } from "svelte/transition";

	let loading: boolean;
	let currentIndex = 0;

	socket.on("connect", async () => {
		// loading = true;
		// await fetchUsersList(true);
		// await fetchFriendsList($session.user.id, true);
		// loading = false;
		if (browser) window.sessionStorage.clear();
		console.log('Connect to socket io server');
	});

	const cycleMessages = () => {
		if (currentIndex == loaderMessages.length - 1) return (currentIndex = 0);
		currentIndex++;
	};

	onMount(async () => {
		let maxRepeat = 0;

		const interval = setInterval(() => {
			maxRepeat++;
			if (maxRepeat == 7) return clearInterval(interval);
			cycleMessages();
		}, 1500);

		return () => {
			clearInterval(interval);
		};
	});
</script>

{#if loading}
	<div class="load-screen">
		<Spinner />
		{#key currentIndex}
			<div class="messages" transition:fade={{ duration: 240 }}>
				<h5>{loaderMessages[currentIndex].title}</h5>
				<!-- <p>{loaderMessages[currentIndex].desc}...</p> -->
			</div>
		{/key}
	</div>
{:else}
	<div class="wrapper">
		{#each $notifcations as data}
			<ChatNotifcation id={data.id} message={data.message} username={data.user.username} />
		{/each}
	</div>
	<slot />
{/if}

<style lang="scss">
	.wrapper {
		position: absolute;
		display: flex;
		gap: 1rem;
		flex-direction: column-reverse;
		z-index: 100;
		bottom: 15px;
		right: 15px;
	}
	.load-screen {
		width: 100%;
		height: 100%;
		position: absolute;
		z-index: 1000;
		background-color: var(--color-black-s1);
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		gap: 1rem;

		.messages {
			position: absolute;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			transform: translateY(80px);
			gap: 0.3rem;
		}

		h5 {
			color: var(--color-gray-s2);
		}
	}
</style>
