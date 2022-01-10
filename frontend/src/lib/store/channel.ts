import { derived, get, writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
import type { Channel, PrivateChannel, ChannelType } from '../types';
import { session } from '$app/stores';

type Status = 'loading' | 'available' | 'error';
interface ChannelStore {
	status: Status;
	publicChannels: readonly Channel[];
	privateChannels: readonly PrivateChannel[];
}

const fetchChannelData = async <Channel>(type: ChannelType): Promise<Channel> => {
	const url = `http://localhost:5000/channel${type == 'user' ? `/user/1` : ''}`;

	const response = await fetch(url, {
		method: 'GET',
		credentials: 'include'
	});

	if (!response.ok) throw new Error('Error retriving user channels...');

	const result = await response.json();
	return result;
};

const createChannelStore = () => {
	const store = writable({ status: 'loading', privateChannels: [], publicChannels: [] }, () => {
		if (get(store).status == 'loading') {
			console.log('New Subscription: fufulling data');
			init();
		}
	}) as Writable<ChannelStore>;

	const init = async () => {
		const publicChannels = await fetchChannelData<Channel[]>('group');
		const privateChannels = await fetchChannelData<PrivateChannel[]>('user');

		store.update(value => {
			value.status = 'available';
			value.publicChannels = Object.freeze(publicChannels);
			value.privateChannels = Object.freeze(privateChannels);
			return value;
		});
	};

	const addPublicChannel = (channel: Omit<Channel, 'type'>) => {
		store.update(channels => {
			channels.publicChannels = [...channels.publicChannels, { ...channel, type: 'group' }];
			return channels;
		});
	};

	const addPrivateChannel = (channel: PrivateChannel) => {
		store.update(channels => {
			channels.privateChannels = [...channels.privateChannels, channel];
			return channels;
		});
	};

	return {
		subscribe: store.subscribe,
		set: store.set,
		update: store.update,
		addPrivateChannel,
		addPublicChannel
	};
};

export const channelStore = createChannelStore();
export const privateChannels = derived(channelStore, $state => $state.privateChannels);
export const groupChannels = derived(channelStore, $state => $state.publicChannels);
