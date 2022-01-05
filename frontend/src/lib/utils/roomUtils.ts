import { browser } from '$app/env';

const BROWSER_ERR_MSG = 'Function must be ran on the client side.';

export function getMessages(room: string): Message[] {
	if (!browser) return;

	const roomData = JSON.parse(window.sessionStorage.getItem(`room-${room}`));

	return roomData?.messages;
}

export function setMessages(room: string, messages: Message[]): string {
	if (!browser) return BROWSER_ERR_MSG;

	const roomData = JSON.parse(window.sessionStorage.getItem(`room-${room}`)) || {};

	roomData['messages'] = messages;

	window.sessionStorage.setItem(`room-${room}`, JSON.stringify(roomData));
}
