<script lang="ts">
	import { loaderMessages } from "$lib/constants";
	import ChatNotifcation from "$lib/global/ChatNotifcation.svelte";
	import Spinner from "$lib/global/Spinner.svelte";
	import { socket } from "$lib/socket";
	import { notifcations } from "$lib/stores";
	import { onDestroy, onMount } from "svelte";
	import { fade } from "svelte/transition";

	let loading: boolean = false;
	let currentIndex = 0;

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

<!-- 
{#if loading}
	<div class="load-screen">
		<Spinner />
		{#key currentIndex}
			<div class="messages" transition:fade={{ duration: 240 }}>
				<h5>{loaderMessages[currentIndex].title}</h5>
			</div>
		{/key}
	</div>
{:else}
	<div class="wrapper">
		{#if $notifcations}
			{#each $notifcations as data}
				<ChatNotifcation id={data.id} message={data.message} username={data.sender.username} />
			{/each}
		{/if}
	</div>
	{/if} -->
<slot />

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
