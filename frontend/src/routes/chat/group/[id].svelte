<script context="module" lang="ts">
	import type { Load } from "@sveltejs/kit";
	import { socket } from "$lib/socket";

	export const load: Load = async ({ page }) => {
		const room = page.params.id;

		socket.emit("room:join", { room });

		return {
			props: {
				room,
				messages: []
			}
		};
	};
</script>

<script lang="ts">
	import ChannelBio from "$lib/chat/ChannelBio.svelte";
	import ChatInput from "$lib/chat/ChatInput.svelte";
	import Message from "$lib/chat/Message.svelte";
	export let room, messages;

	/* Read incoming messages */
	socket.on("message:read", (payload) => {
		if (payload.room != room) return;

		messages = [...messages, { message: payload.message, username: payload.username, room: payload.room }];
	});

	interface Message {id: number; message: string; room: string; userId: number; user: any}
	socket.on("history", (payload: Message[]) => {
		console.log(payload);
		messages = [...messages, ...payload];
	});

	/* Handle submitted messages */
	const handleMessageSubmit = (event) => {
		const message = event.detail;

		socket.emit("message:send", { message, room });
	};

	interface Message {
		message: string;
		username: string;
		room: string;
	}
</script>

<section>
	<ChannelBio channel={room} type="group" members={5} />

	<div class="messages">
		{#each messages as message}
			<Message message={message?.message} user={message.username} attachedMessage={false} date={new Date()} />
		{/each}
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
		height: 100%;
		overflow-y: auto;
		flex-direction: column;
		padding: 0.3rem 1.8rem;
		padding-bottom: 1.0rem;
		justify-content: end;
	}
</style>
