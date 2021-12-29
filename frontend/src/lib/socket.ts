import { io, Socket } from 'socket.io-client';

const socket: Socket = io('ws://localhost:5000/', {
	withCredentials: true,
	reconnectionAttempts: 10,
	reconnectionDelay: 3000,
	auth: {
		sid: 'abc'
	}
});

export const connectClient = (): void => {
	/* Connect to socket. */
	socket.on('connect', () => {
		console.log('Connected', socket.id);
	});
};

// /* Handle connection error */
// socket.on('connect_error', err => {
// 	socket.io.opts.transports = ['polling', 'websocket'];
// 	console.log('error', err);
// 	socket.disconnect();
// });

export { socket };
