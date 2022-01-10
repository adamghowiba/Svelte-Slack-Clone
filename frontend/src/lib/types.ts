export interface Channel {
	id: number;
	users: User[];
	type: ChannelType;
	notifcations?: number;
	name?: string;
}

/* TODO: Fix return value */
export interface PrivateChannel {
	username: string;
	id: number;
	channelId: number;
}

export interface ChannelStore {
	privateChannels: PrivateChannel[];
	publicChannels: Channel[];
}

export interface User {
	id: number;
	username: string;
}

export interface Message {
	message: string;
	sender: User;
	channelId: number;
}

export interface Notifcation extends Message {
	id: number;
}

/* TYPES */
export type ChannelType = 'user' | 'group';
