<script context="module" lang="ts">
	import type { Load } from "@sveltejs/kit";

	export const load: Load = async ({ url, params }) => {
		const channelId = parseInt(params.id);
		const channelType = url.searchParams.get("type");
		const room = url.searchParams.get(channelType);
		socket.emit("room:join", { channelId });

		return {
			props: {
				room,
				channelId,
				channelType
			}
		};
	};
</script>

<script lang="ts">
	import { navigating, session } from "$app/stores";
	import { loadChatMessages } from "$lib/api/chat-api";
	import ChannelBio from "$lib/chat/ChannelBio.svelte";
	import ChatInput from "$lib/chat/ChatInput.svelte";
	import Message from "$lib/chat/Message.svelte";
	import ChannelPopup from "$lib/global/popup/channel/ChannelPopup.svelte";
	import { socket } from "$lib/socket";
	import { publicChannel } from "$lib/store/channel";
	import { chatStore } from "$lib/store/chat";
	import { overlay } from "$lib/store/interface";
	import type { Channel, ChannelType } from "$lib/types";
	import { onDestroy } from "svelte";
	import { notifcations } from "$lib/stores";

	export let room: string;
	export let channelId: number;
	export let channelType: ChannelType;

	let messages = [];
	let query: boolean;
	let channelData: Channel;

	/* Read incoming messages */
	socket.on("message:read", (payload) => {
		const { message, username } = payload;
		const messageData = { message, sender: { username, id: 0 }, channelId };

		chatStore.addMessages(channelId, messageData);
		
		// Show message if they're in the payload channel is in view.
		if (payload.channelId == channelId) {
			messages = [messageData, ...messages];
		}

		// Send notifcation
		if (username != $session.user.username) return $notifcations = [...$notifcations, { ...messageData, id: $session.user.id }];
	});

	const handleMessageSubmit = (event) => {
		const message = event.detail;

		socket.emit("message:send", { message, room, channelId });
	};

	const loadMessages = async (channelId: number) => {
		query = true;
		const messageData = await loadChatMessages(channelId);
		query = false;

		messages = messageData;
	};

	const openPopup = (type: keyof typeof popups) => {
		popups[type] = true;
		$overlay = true;
	};

	onDestroy(() => {
		messages = [];
		socket.removeListener("message:read");
	});

	/* TODO: Save scroll with this bad boy. */
	$: if ($navigating) {
		// const scroll = document.querySelector(".messages");
	}

	$: popups = {
		publicChannel: false,
		privateChannel: false
	};

	$: {
		channelData = $publicChannel.find((channel) => channel.id == channelId);
		loadMessages(channelId);
	}
</script>

<section>
	<ChannelBio channel={room} type={channelType} members={5} on:click={() => openPopup("publicChannel")} />

	<ChannelPopup active={popups.publicChannel} {channelData} />

	<div class="messages">
		{#if !query}
			{#each messages || [] as message}
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

	<ChatInput on:submitMessage={handleMessageSubmit} />
</section>

<style lang="scss">
	section {
		height: 100%;
		width: 100%;
		display: grid;
		grid-template-rows: auto 1fr auto;
		overflow-y: auto;
	}
	.messages {
		display: flex;
		position: relative;
		height: 100%;
		flex-direction: column-reverse;
		overflow-y: auto;
		padding: 0.3rem 1.8rem;
		padding-bottom: 1rem;
	}
</style>
