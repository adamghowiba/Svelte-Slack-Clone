import { channelStore } from '$lib/stores';
import type { ChannelStore } from '$lib/types';
import { get } from 'svelte/store';

/* TODO: Clean this up, NOT DRYYY */
export const ChannelState = {
	getPublic(): ChannelStore['publicChannels'] {
		return get(channelStore).publicChannels;
	},
	setPublic(value: ChannelStore['publicChannels']): void {
		channelStore.update(channel => {
			channel.publicChannels = value;
			return channel;
		});
	},
	getPrivate(): ChannelStore['privateChannels'] {
		return get(channelStore).privateChannels;
	},
	setPrivate(value: ChannelStore['privateChannels']): void {
		channelStore.update(channel => {
			channel.privateChannels = value;
			return channel;
		});
	}
};
