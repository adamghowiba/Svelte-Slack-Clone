import { chatStore } from '$lib/store/chat';
import type { Message } from '$lib/types';
import { get } from 'svelte/store';

export const loadChatMessages = async (channel: number): Promise<Message[]> => {
	const messages = get(chatStore);

	if (messages.has(channel)) {
		return messages.get(channel);
	}

	const response = await fetch(`http://localhost:5000/messages/channel/${channel}`, {
		method: 'GET',
		credentials: 'include'
	});

	const result = await response.json();
	chatStore.setMessages(channel, result);
	return result;
};
