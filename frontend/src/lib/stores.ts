import { writable } from "svelte/store";
import type { Writable } from "svelte/store";

export const user: Writable<User> = writable({username: 'Bigamounts'});
export const messages: Writable<Message[]> = writable([]);