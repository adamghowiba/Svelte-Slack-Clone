<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ page }) => {
		const room = page.params.room;

		return {
			props: {
				room
			}
		};
	};
</script>

<script lang="ts">
	import ChatInput from '$lib/chat/ChatInput.svelte';
	import MessageElement from '$lib/chat/Message.svelte';
	import { messages, user } from '$lib/stores';
	import { session } from '$app/stores';
	import ChannelBio from '$lib/chat/ChannelBio.svelte';

	function submitMessage(event: CustomEvent) {
		let attached = false;

		/* Check if the sender is the last message */
		if ($messages.length >= 1 && $messages[$messages.length - 1].username == $user.username) {
			attached = true;
		}

		const messageData = { username: $session.user.username, message: event.detail };
		// socket.emit('chat_message', messageData);
	}

	export let room;
</script>

<section class="wrapper">
	<ChannelBio channel={room} type="group" members={5} />

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
