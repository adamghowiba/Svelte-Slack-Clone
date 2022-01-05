/// <reference types="@sveltejs/kit" />

interface User {
	username: string;
}

interface Message {
	message: string;
	user: { username: string };
	room: string;
}

interface Notifcation extends Message {
	id: number;
}
