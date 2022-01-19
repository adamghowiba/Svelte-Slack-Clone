import type { User } from '$lib/types';

export const fetchUsersList = async (): Promise<User[]> => {
	const url = `http://localhost:5000/user`;

	const response = await fetch(url, {
		method: 'GET',
		credentials: 'include'
	});

	if (!response.ok) throw new Error('Error retriving friends...');
	const result = await response.json();

	return result;
};

export const uploadUserStatus = async () => {
	const url = `http://localhost:5000/user`;

	const response = await fetch(url, {
		method: 'GET',
		credentials: 'include'
	});

	if (!response.ok) throw new Error('Error retriving friends...');
	const result = await response.json();

	return result;
};
