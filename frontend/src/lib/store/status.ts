import { session } from '$app/stores';
import type { Status } from '$lib/types';
import { get, writable } from 'svelte/store';

export const statusStore = writable<Status>(null, set => {
	fetch(`http://localhost:5000/user/${get(session).user.id}/status`, {
		method: 'GET',
		credentials: 'include',
		window: null
	})
		.then(res => res.json())
		.then(set);
});

