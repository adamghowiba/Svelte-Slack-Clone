import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
import type { Message } from '$lib/types';

/* Mapped Custom Chat Store */

const createChatStore = () => {
	const store: Writable<Map<number, Message[]>> = writable(new Map());

	const addMessages = (channelId: number, messages: Message) => {
		store.update(chat => {
			chat.set(channelId, chat.get(channelId) ? [messages, ...chat.get(channelId)] : [messages]);
			return chat;
		});
	};

	const setMessages = (channelId: number, messages: Message[]) => {
		store.update(chat => {
			chat.set(channelId, [...messages]);
			return chat;
		});
	};

	return {
		subscribe: store.subscribe,
		addMessages,
		setMessages
	};
};

export const chatStore = createChatStore();
