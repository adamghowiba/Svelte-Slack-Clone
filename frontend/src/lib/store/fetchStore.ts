import { writable } from 'svelte/store';

export const fetchStore = (url: string) => {
	const loading = writable(false);
	const error = writable(false);
	const data = writable({});

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
	}

	return { data, loading, error, get };
};
