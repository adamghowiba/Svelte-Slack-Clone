import type { User } from "$lib/types";

export const fetchUsersList = async (): Promise<User[]> => {
	const url = `http://localhost:5000/user`;

	const response = await fetch(url, {
		method: "GET",
		credentials: "include"
	});

	if (!response.ok) throw new Error("Error retriving friends...");
	const result = await response.json();

	return result;
};

export const uploadUserStatus = async (userId: number, emoji: string, status: string = undefined) => {
	const url = `http://localhost:5000/user/${userId}/status`;

	const response = await fetch(url, {
		headers: {
			"Content-Type": "application/json"
		},
		method: "PUT",
		body: JSON.stringify({ emoji, status }),
		credentials: "include"
	});

	if (!response.ok) throw new Error("Error updating status...");

	const result = await response.json();

	return result;
};

export const clearUserStatus = async (userId: number) => {
	const url = `http://localhost:5000/user/${userId}/status`;

	const response = await fetch(url, {
		method: "DELETE",
		credentials: "include"
	});

	if (!response.ok) throw new Error("Error deleting status...");

	const result = await response.json();

	return result;
};
