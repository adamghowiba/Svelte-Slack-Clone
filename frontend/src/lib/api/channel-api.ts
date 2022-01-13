import type { Channel, ChannelType } from '$lib/types';

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

export const updateChannel = async (id: number, data: Partial<Omit<Channel, 'id'>>): Promise<unknown> => {
	const url = `http://localhost:5000/channel/${id}`;

	const response = await fetch(url, {
		headers: {
			'Content-Type': 'application/json'
		},
		method: 'PUT',
		credentials: 'include',
		body: JSON.stringify(data)
	});

	if (!response.ok) throw new Error('Error while updating channel');

	const result = await response.json();
	return result;
};
