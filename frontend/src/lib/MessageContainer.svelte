<script lang="ts">
	import { browser } from "$app/env";
	import { onDestroy, onMount } from "svelte";

    export let room: string;
	let messagesElem: HTMLElement;
    let previousRoom = room;

	onDestroy(() => {
		if (!browser) return;

		const roomData = JSON.parse(window.sessionStorage.getItem(`room-${room}`)) || {};
		roomData['scroll'] = messagesElem.scrollTop;

		window.sessionStorage.setItem(`room-${previousRoom}`, JSON.stringify(roomData));
	});

	onMount(() => {
		const roomData = JSON.parse(window.sessionStorage.getItem(`room-${room}`));
		if (roomData?.scroll) messagesElem.scroll({ top: roomData.scroll });
	});
</script>

<div class="messages" bind:this={messagesElem}>
	<slot />
	<div class="blank-space" />
</div>

<style lang="scss">
	.messages {
		display: flex;
		position: relative;
		height: 100%;
		overflow-y: auto;
		flex-direction: column-reverse;
		padding: 0.3rem 1.8rem;
		padding-bottom: 1rem;
	}
	.blank-space {
		display: block;
		width: 100%;
		min-height: 300px;
	}
</style>
