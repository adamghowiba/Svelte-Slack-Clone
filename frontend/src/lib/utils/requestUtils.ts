/* TODO: These shouldn't be here */
interface Friend {
	friend_id: number;
	user_id: number;
	status: string;
	friend: { id: number; username: string };
}

interface User {
    id: number;
    username: string;
}

export const fetchFriendsList = async (userId: number, updateCache = false): Promise<Friend[]> => {
	const url = `http://localhost:5000/user/${userId}/friends`;
	const cstore = await caches.open('cstore');
	const cacheResponse = await cstore.match(url);

	if (cacheResponse) {
		if (!updateCache) {
			const data = await cacheResponse.json();
			return data;
		}
		cstore.delete(url);
	}

	const response = await fetch(url, {
		method: 'GET',
		credentials: 'include'
	});

	if (!response.ok) throw new Error('Error retriving friends...');

	await cstore.put(url, response.clone());
	console.log('fetched new friends')
	return await response.json();
};

export const fetchUsersList = async (updateCache = false): Promise<User[]> => {
	const url = `http://localhost:5000/user`;
	const cstore = await caches.open('cstore');
	const cacheResponse = await cstore.match(url);

	if (cacheResponse) {
		if (!updateCache) {
			const data = await cacheResponse.json();
			return data;
		}
		cstore.delete(url);
	}

	const response = await fetch(url, {
		method: 'GET',
		credentials: 'include'
	});

	if (!response.ok) throw new Error('Error retriving friends...');

	await cstore.put(url, response.clone());
	console.log('fetched new users')
	return await response.json();
};
