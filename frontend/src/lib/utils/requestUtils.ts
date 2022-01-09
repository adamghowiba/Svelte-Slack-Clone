import { messageStorage } from './localStorage';
import { ChannelState as channel } from '$lib/controllers/channel-controller';
import type { ChannelStore, User } from '$lib/types';
import { channelStore } from '$lib/stores';

export const fetchChannelList = async (updateCache = false): Promise<ChannelStore['publicChannels']> => {
	const url = `http://localhost:5000/channel`;
	const channels = channel.getPublic();

	if (channels && channels.length >= 1) {
		console.log('Found CHANNELS in state', channels);
		return channels;
	}

	const response = await fetch(url, {
		method: 'GET',
		credentials: 'include'
	});

	if (!response.ok) throw new Error('Error retriving channels...');
	const result = await response.json();

	channel.setPublic(result);
	return result;
};

export const fetchPrivateChannels = async (userId: number): Promise<ChannelStore['privateChannels']> => {
	const url = `http://localhost:5000/channel/user/${userId}&type=PRIVATE`;
	const channels = channel.getPrivate();

	if (channels && channels.length >= 1) {
		// console.log('Found PRIVATE CHANNEL in state', channels);
		return channels;
	}

	const response = await fetch(url, {
		method: 'GET',
		credentials: 'include'
	});

	if (!response.ok) throw new Error('Error retriving user channels...');

	const result = await response.json();
	channel.setPrivate(result);
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
	const localMessages = messageStorage.getItem(channel);

	if (localMessages) {
		// console.log(`Found messages for ${channel} in storage`);
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
