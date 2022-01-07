import { browser } from '$app/env';
import { messageStorage, Storage } from './localStorage';
import type { ChannelState } from './localStorage';

/* TODO: These shouldn't be here */
interface Friend {
	friend_id: number;
	user_id: number;
	status: string;
	friend: { id: number; username: string };
}

interface Channel {
	id: number;
	name?: string;
	type: 'PUBLIC' | 'PRIVATE';
	users: unknown[];
}

interface PrivateChannel {
	username: string;
	id: number;
	channelId: number;
}

interface User {
	id: number;
	username: string;
}

let storage: Storage<ChannelState>;

if (browser) storage = new Storage<ChannelState>('channel');

export const fetchChannelList = async (updateCache = false): Promise<Channel[]> => {
	const url = `http://localhost:5000/channel`;
	const cstore = await caches.open('cstore');
	const cacheResponse = await cstore.match(url);

	if (cacheResponse) {
		if (!updateCache) {
			const data = await cacheResponse.json();
			return data;
		}
		cstore.delete(url);
	}

	const response = await fetch(url, {
		method: 'GET',
		credentials: 'include'
	});

	if (!response.ok) throw new Error('Error retriving channels...');

	await cstore.put(url, response.clone());
	return await response.json();
};

export const fetchUsersList = async (updateCache = false): Promise<User[]> => {
	const url = `http://localhost:5000/user`;
	const usersList = storage.getItem('users');

	if (usersList) {
		console.log('Fetched users from storage');
		return usersList;
	}

	const response = await fetch(url, {
		method: 'GET',
		credentials: 'include'
	});

	if (!response.ok) throw new Error('Error retriving friends...');
	const result = await response.json();

	storage.update('users', result);
	return result;
};

export const fetchPrivateChannels = async (userId: number): Promise<PrivateChannel[]> => {
	const url = `http://localhost:5000/user/${userId}/channels`;
	const privateChannels = storage.getItem('private');

	if (privateChannels) {
		console.log('Found private channels in storage');
		return privateChannels;
	}

	const response = await fetch(url, {
		method: 'GET',
		credentials: 'include'
	});

	if (!response.ok) throw new Error('Error retriving user channels...');

	const result = await response.json();
	storage.update('private', result);
	return result;
};

export const loadChatMessages = async (channel: number) => {
	const localMessages = messageStorage.getItem(channel);

	if (localMessages) {
		console.log(`Found messages for ${channel} in storage`);
		return localMessages;
	}

	const response = await fetch(`http://localhost:5000/messages/channel/${channel}`, {
		method: 'GET',
		credentials: 'include'
	});
	const result = await response.json();
	messageStorage.update(channel, result);

	return result;
};
