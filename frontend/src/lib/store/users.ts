import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
import type { User } from '$lib/types';
import { fetchUsersList } from '$lib/api/user-api';

type Status = 'loading' | 'available' | 'error';
interface AsyncStore<T> {
	state: Status;
	data?: T;
}

const initalAsyncState: AsyncStore<[]> = { state: 'loading', data: [] };

export const allUsers = writable<AsyncStore<User[]>>(initalAsyncState, set => {
	fetchUsersList().then((value: User[]) => {
		set({ state: 'available', data: value });
	});
});

export const onlineUsers: Writable<User[]> = writable([]);
