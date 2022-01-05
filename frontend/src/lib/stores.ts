import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';

export const messages: Writable<Message[]> = writable([]);
export const notifcations:  Writable<Notifcation[]> = writable([]);