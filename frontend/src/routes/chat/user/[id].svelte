<script context="module" lang="ts">
	import type { Load } from "@sveltejs/kit";
	import { socket } from "$lib/socket";

	export const load: Load = async ({ page, stuff }) => {
		const channelId = page.params.id;
		const username = page.query.get("user");
		socket.emit("room:join", { room: username });

		return {
			props: {
				channelId,
				username
			}
		};
	};
</script>

<script lang="ts">
	import ChannelBio from "$lib/chat/ChannelBio.svelte";
	import ChatInput from "$lib/chat/ChatInput.svelte";
	import Message from "$lib/chat/Message.svelte";
	import { browser } from "$app/env";
	import { onDestroy } from "svelte";
	import { messageStorage } from "$lib/utils/localStorage";
	import { loadChatMessages } from "$lib/utils/requestUtils";

	export let channelId: number;
	export let username: string;

	let messages = [];
	let query;

	/* Read incoming messages */
	socket.on("message:read", (payload) => {
		const messageData = { message: payload.message, sender: { username: payload.username, id: 0 }, channelId };
		messages = [messageData, ...messages];

		console.log("Socket Recvied Message");
		messageStorage.update(channelId, messages);
	});

	/* Handle submitted messages */
	const handleMessageSubmit = (event) => {
		const message = event.detail;

		socket.emit("message:send", { message, room: username, channelId });
	};

	const loadMessages = async (channelId: number) => {
		query = true;
		const messageData = await loadChatMessages(channelId);
		query = false;

		messages = messageData;
	};

	onDestroy(() => {
		messages = [];
		socket.removeAllListeners();
	});

	$: if (browser && channelId) {
		loadMessages(channelId);
	}
</script>

<section>
	<ChannelBio channel={username} type="user" />

	<div class="messages">
		{#if !query}
			{#each messages || [] as message, i}
				<Message message={message?.message} user={message.sender.username} attachedMessage={false} date={new Date()} />
			{/each}
		{:else}
			<h2>Loading...</h2>
		{/if}
	</div>
	<ChatInput on:submitMessage={handleMessageSubmit} />
</section>

<style lang="scss">
	section {
		height: 100%;
		width: 100%;
		display: grid;
		grid-template-rows: auto 1fr auto;
	}
	.messages {
		display: flex;
		position: relative;
		height: 100%;
		overflow-y: auto;
		flex-direction: column-reverse;
		padding: 0.3rem 1.8rem;
		padding-bottom: 1rem;
	}
	// .blank-space {
	// 	display: block;
	// 	width: 100%;
	// 	min-height: 300px;
	// }
</style>
