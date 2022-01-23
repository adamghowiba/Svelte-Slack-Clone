import { io, Socket } from "socket.io-client";

const socket: Socket = io("ws://localhost:5000/", {
	withCredentials: true,
	reconnectionAttempts: 10,
	reconnectionDelay: 3000,
	autoConnect: false,
	auth: {
		sid: "abc"
	}
});

/* Handle connection error */
// socket.on('connect_error', err => {
// 	socket.io.opts.transports = ['polling', 'websocket'];
// 	console.log('error', err);
// 	socket.disconnect();
// });

export { socket };
