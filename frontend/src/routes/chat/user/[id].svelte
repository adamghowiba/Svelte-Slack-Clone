<script context="module" lang="ts">
	import type { Load } from "@sveltejs/kit";
	import { socket } from "$lib/socket";

	export const load: Load = async ({ page, fetch }) => {
		const username = page.params.id;
		// socket.emit("room:join", { room });

		return {
			props: {
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
	import { page as sveltePage, session } from "$app/stores";
	import { onMount } from "svelte";
	import { browser } from "$app/env";
	import { getMessages, setMessages } from "$lib/utils/roomUtils";
	import { notifcations } from "$lib/stores";

	export let username: string;
	export let page: string;

	let messages = [];
	let query;

	/* Read incoming messages */
	socket.on("private:read", (payload) => {
		const messageData = { message: payload.message, user: { username: payload.username } };
		messages = [messageData, ...messages];

		// setMessages(room, messages);
	});

	const notifyUser = (username: string, messageData: any) => {
		if (username == $session.user.username) return;
		const data: Notifcation = { id: Math.floor(Math.random() * 1000), ...messageData };
		$notifcations = [...$notifcations, data];
	};

	/* Handle submitted messages */
	const handleMessageSubmit = (event) => {
		const message = event.detail;

		socket.emit("private:send", { message, username });
	};

	const loadChatMessages = async (user: string) => {
		// const sessionMessages = getMessages(currentRoom);

		// if (sessionMessages) return (messages = sessionMessages);

		query = true;
		const response = await fetch(`http://localhost:5000/messages/user/${user}`, {
			method: "GET",
			credentials: "include"
		});
        if (!response.ok) return messages = undefined;

		const result = await response.json();
		query = false;

        if (user != username) return;
		messages = result;
		// setMessages(currentRoom, result);
	};

	$: if (browser && username) {
		// messages = [];
		loadChatMessages(username);
	}
</script>

<section>
	<ChannelBio channel={username} type="user" />

	<div class="messages">
		{#if !query}
			{#each messages || [] as message, i}
				<Message message={message?.message} user={message?.user?.username} attachedMessage={false} date={new Date()} />
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
