<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';
	export const load: Load = async ({ session }) => {
		if (!session.user) {
			return {
				status: 302,
				redirect: '/'
			};
		}
		return {
			status: 200
		};
	};
</script>

<script lang="ts">
	import ChatInput from '$lib/chat/ChatInput.svelte';
	import MessageElement from '$lib/chat/Message.svelte';
	import { messages, user } from '$lib/stores';
	import { io } from 'socket.io-client';
	import type { Socket } from 'socket.io-client';
	import { onDestroy } from 'svelte';
	import Button from '$lib/global/Button.svelte';
	import { session } from '$app/stores';
	import Sidebar from '$lib/chat/sidebar/Sidebar.svelte';
	import ChannelBio from '$lib/chat/ChannelBio.svelte';

	let socket: Socket = io('ws://localhost:5000');

	socket.on('message', (message) => {
		console.log(message);
	});

	socket.on('new_message', (message) => {
		$messages = [
			...$messages,
			{ username: message.username, message: message.message, attached: false, date: new Date() }
		];
		console.log(message);
	});

	onDestroy(() => {
		socket.disconnect();
	});

	function submitMessage(event: CustomEvent) {
		let attached = false;

		/* Check if the sender is the last message */
		if ($messages.length >= 1 && $messages[$messages.length - 1].username == $user.username) {
			attached = true;
		}

		/* Transmit Websocket message */
		const messageData = { username: $session.user.username, message: event.detail };
		socket.emit('chat_message', messageData);
	}
</script>

<section class="wrapper">
	<ChannelBio channel="Projects" type="group" members={5} />

	<div class="messages">
		{#each $messages as message}
			<MessageElement
				message={message?.message}
				user={message?.username}
				attachedMessage={message?.attached}
				date={message?.date}
			/>
		{/each}
	</div>

	<ChatInput on:submitMessage={submitMessage} />
</section>

<style lang="scss">
	section {
		display: grid;
		grid-template-rows: auto 1fr auto;
		width: 100%;
		height: 100%;
	}
	.messages {
		display: flex;
		height: 100%;
		overflow-y: auto;
		flex-direction: column;
		padding: 0.3rem 1.8rem;
	}


</style>
