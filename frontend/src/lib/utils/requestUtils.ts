import type { Channel, ChannelStore, User } from '$lib/types';
import { get } from 'svelte/store';
import type { Writable } from 'svelte/store';
import { chatStore } from '$lib/store/chatMessages';

const queryData = async <T>(url: string, store: Writable<T[]>): Promise<Writable<T[]>> => {
	const storeData = get(store);

	if (storeData && storeData?.length > 0) {
		return store;
	}

	const response = await fetch(url, {
		method: 'GET',
		credentials: 'include'
	});

	if (!response.ok) throw new Error('Error retriving channels...');
	const result = await response.json();

	store.set(result);
	return store;
};

// export const fetchChannelList = async (): Promise<Writable<Channel[]>> => {
// 	const url = `http://localhost:5000/channel`;
// 	const data = await queryData<Channel>(url, channelStores.groupChannel);

// 	return data;
// };

export const fetchPrivateChannels = async (userId: number): Promise<ChannelStore['privateChannels']> => {
	const url = `http://localhost:5000/channel/user/${userId}&type=PRIVATE`;

	const response = await fetch(url, {
		method: 'GET',
		credentials: 'include'
	});

	if (!response.ok) throw new Error('Error retriving user channels...');

	const result = await response.json();
	return result;
};

export const fetchUsersList = async (updateCache = false): Promise<User[]> => {
	const url = `http://localhost:5000/user`;

	const response = await fetch(url, {
		method: 'GET',
		credentials: 'include'
	});

	if (!response.ok) throw new Error('Error retriving friends...');
	const result = await response.json();

	return result;
};

export const loadChatMessages = async (channel: number) => {
	const messages = get(chatStore);

	if (messages.has(channel) && messages.get(channel).length > 0) {
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
