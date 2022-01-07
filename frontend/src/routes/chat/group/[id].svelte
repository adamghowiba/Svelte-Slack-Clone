<script context="module" lang="ts">
	import type { Load } from "@sveltejs/kit";
	import { socket } from "$lib/socket";

	export const load: Load = async ({ page, fetch }) => {
		const channelId = page.params.id;
		const room = page.query.get("group");
		socket.emit("room:join", { room });

		return {
			props: {
				room,
				channelId,
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
	import MessageContainer from "$lib/MessageContainer.svelte";
	import { notifcations } from "$lib/stores";
	import { messageStorage } from "$lib/utils/localStorage";
	export let room, page, channelId;

	let messages = [];
	let query;
	let messagesElem: HTMLElement;

	/* Read incoming messages */
	socket.on("message:read", (payload) => {
		const messageData = { message: payload.message, sender: { username: payload.username, id: 0 }, channelId };
		messages = [messageData, ...messages];

		const localMessages = messageStorage.getItem(channelId);
		console.log(localMessages);
		messageStorage.update(channelId, [messageData, ...localMessages]);
		// setMessages(room, messages);
	});

	const notifyUsers = (username: string, messageData: any) => {
		if (username == $session.user.username) return;
		const data: Notifcation = { id: Math.floor(Math.random() * 1000), ...messageData };
		$notifcations = [...$notifcations, data];
	};

	/* Handle submitted messages */
	const handleMessageSubmit = (event) => {
		const message = event.detail;

		socket.emit("message:send", { message, room, channelId });
	};

	// let page = 1;
	const loadImages: IntersectionObserverCallback = async (entry) => {
		if (!entry[0].isIntersecting || messages.length < 13) return;
		const response = await fetch(`http://localhost:5000/messages/group/${room}?page=${page}`, {
			method: "GET"
		});
		const chatMessages = await response.json();
		messages = [...messages, ...chatMessages];
		console.log(`Loading pagee results ${page}`);
		page++;
	};

	const loadChatMessages = async (channel: number) => {
		if (query) return;
		const localMessages = messageStorage.getItem(channel);
		if (localMessages) {
			console.log(`Found messages for ${channel} in storage`);
			return (messages = localMessages);
		}

		query = true;
		const response = await fetch(`http://localhost:5000/messages/channel/${channel}`, {
			method: "GET",
			credentials: "include"
		});
		const result = await response.json();
		query = false;
		messageStorage.update(channel, result);
		messages = result;
	};

	onMount(() => {
		const blankSpace = document.querySelector(".blank-space");

		// let observer = new IntersectionObserver(loadImages, { root: messagesElem, threshold: 0.7 });
		// observer.observe(blankSpace);
	});

	$: if (browser && channelId) {
		messages = [];
		loadChatMessages(channelId);
	}
</script>

<section>
	<ChannelBio channel={room} type="group" members={5} />

	<!-- {#key browser} -->
	<!-- <MessageContainer {room}> -->
	<div class="messages">
		{#if !query}
			{#each messages || [] as message, i}
				<Message
					message={message?.message}
					user={message?.sender?.username}
					attachedMessage={false}
					date={new Date()} />
			{/each}
		{:else}
			<h2>Loading...</h2>
		{/if}
	</div>
	<!-- </MessageContainer> -->
	<!-- {/key} -->

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
	.blank-space {
		display: block;
		width: 100%;
		min-height: 300px;
	}
</style>
