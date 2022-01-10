import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
import type { User } from '$lib/types';

export const userStore: Writable<User[]> = writable([]);
export const onlineUsers: Writable<User[]> = writable([]);
