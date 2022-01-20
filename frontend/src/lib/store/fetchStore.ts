import { writable } from 'svelte/store';
import type{ Writable } from 'svelte/store';
import { log } from '@utils/logger';

export const fetchStore = <T>(url: string) => {
	const loading = writable(false);
	const error = writable(false);
	const data: Writable<T> = writable();

	const get = async () => {
		loading.set(true);
		error.set(false);
		try {
			const response = await fetch(url, { method: 'GET', credentials: 'include' });
			data.set(await response.json());
		} catch (err) {
			error.set(err);
		}
		loading.set(false);
	};

	if (!data || (Array.isArray(data) && data.length == 0)) {
		get();
		log.info('Fetching data for query store')
	}

	return { data, loading, error, get };
};
