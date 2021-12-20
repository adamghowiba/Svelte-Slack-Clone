import { io } from 'socket.io-client';
import type { Socket } from 'socket.io-client';

// let socket: Socket = io('ws://localhost:5000');
	// socket.on('message', (message) => {
	// 	console.log(message);
	// });

	// socket.on('new_message', (message) => {
	// 	$messages = [
	// 		...$messages,
	// 		{ username: message.username, message: message.message, attached: false, date: new Date() }
	// 	];
	// 	console.log(message);
	// });