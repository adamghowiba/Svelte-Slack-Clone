import { browser } from '$app/env';

const stateOptions = {
	ui: 'ui-state',
	channel: 'channel-state',
	message: 'message-history'
};

type StateOptions = keyof typeof stateOptions;

export interface ChannelState {
	public: { username: string; id: number; channelId: number };
	private: { username: string; id: number; channelId: number }[];
	users: { username: string; id: number }[];
}

interface Message {
	sender: {
		username: string;
		id: number;
	};
	message: string;
}
export interface MessageState {
	[channelId: number]: Message[];
}

class Storage<T> {
	private state: string;
	private localStorage = window?.localStorage;

	constructor(stateKey: keyof typeof stateOptions) {
		this.state = stateOptions[stateKey];
	}

	create(): void {
		this.localStorage.setItem(this.state, '{}');
	}

	getAll(): T {
		const result = this.localStorage.getItem(this.state);
		const data = result ? JSON.parse(result) : null;
		if (!data) this.create();

		return data;
	}

	getItem<K extends keyof T>(key: K): T[K] {
		const data = this.getAll();
		const item = data ? data[key] : null;

		return item;
	}

	set(value: T): void {
		this.localStorage.setItem(this.state, JSON.stringify(value));
	}

	update<K extends keyof T>(key: K, value: T[K]): void {
		const data = this.getAll();
		data[key] = value;

		this.localStorage.setItem(this.state, JSON.stringify(data));
	}
}

export { Storage };
