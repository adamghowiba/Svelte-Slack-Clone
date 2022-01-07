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
				username,
				page: 1
			}
		};
	};
</script>

<script lang="ts">
	import ChannelBio from "$lib/chat/ChannelBio.svelte";
	import ChatInput from "$lib/chat/ChatInput.svelte";
	import Message from "$lib/chat/Message.svelte";
	import { browser } from "$app/env";

	export let channelId: number;
	export let username: string;
	export let page: string;

	let messages = [];
	let query;

	/* Read incoming messages */
	socket.on("message:read", (payload) => {
		const messageData = { message: payload.message, sender: { username: payload.username }, channelId };
		messages = [messageData, ...messages];
		// setMessages(room, messages);
	});

	/* Handle submitted messages */
	const handleMessageSubmit = (event) => {
		const message = event.detail;

		socket.emit("message:send", { message, room: username, channelId });
	};

	/* 
	UUID Tactic
	- Generate Public Channel UUIDS by there name.
	- Generate Private UUIDS by name+name
	
	*/


	const loadChatMessages = async (channel: number) => {
		// const sessionMessages = getMessages(currentRoom);

		// if (sessionMessages) return (messages = sessionMessages);

		query = true;
		const response = await fetch(`http://localhost:5000/messages/channel/${channel}`, {
			method: "GET",
			credentials: "include"
		});
		if (!response.ok) return (messages = undefined);

		const result = await response.json();
		query = false;

		if (channel != channelId) return;
		console.log(result);
		messages = result;
		// setMessages(currentRoom, result);
	};

	$: if (browser && channelId) {
		messages = [];
		loadChatMessages(channelId);
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
