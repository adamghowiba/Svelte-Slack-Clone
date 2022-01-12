import type { ChannelType } from '$lib/types';

export const fetchChannelData = async <T>(type: ChannelType, userId: number): Promise<T> => {
	const url = `http://localhost:5000/channel${type == 'user' ? `/user/${userId}` : '?group=section'}`;

	const response = await fetch(url, {
		method: 'GET',
		credentials: 'include'
	});

	if (!response.ok) throw new Error('Error retriving user channels...');

	const result = await response.json();
	return result;
};
