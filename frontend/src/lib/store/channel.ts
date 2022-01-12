import { session } from '$app/stores';
import { fetchChannelData } from '$lib/api/channel-api';
import { get, writable } from 'svelte/store';
import type { PrivateChannel, ChannelGroup } from '../types';

type Status = 'loading' | 'available' | 'error';
interface AsyncStore<T> {
	state: Status;
	data?: T;
}

const initalAsyncState: AsyncStore<[]> = { state: 'loading', data: [] };

export const privateChannels = writable<AsyncStore<PrivateChannel[]>>(initalAsyncState, set => {
	fetchChannelData('user', get(session).user.id).then((value: PrivateChannel[]) => {
		set({ state: 'available', data: value });
	});
});

export const publicChannels = writable<AsyncStore<ChannelGroup[]>>(initalAsyncState, set => {
	fetchChannelData('group',  get(session).user.id).then((value: ChannelGroup[]) => {
		set({ state: 'available', data: value });
	});
});
