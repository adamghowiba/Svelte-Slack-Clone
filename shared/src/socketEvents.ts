const socketEvents = {
	user: {
		disconnected: 'user:disconnected',
		connected: 'user:connected'
	},
	room: {
		joined: 'room:joined',
		leave: 'room:leave'
	},
	messages: {
		receive: 'message:read',
		send: 'message:send'
	}
};
