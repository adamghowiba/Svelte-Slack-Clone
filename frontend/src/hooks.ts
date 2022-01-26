import type { Handle, GetSession } from '@sveltejs/kit';

const mockUser = {
	username: 'adamscode',
	id: 1
};

export const handle: Handle = async ({ event, resolve }) => {
	// const response = await fetch('http://localhost:5000/user/me', {
	// 	headers: {
	// 		cookie: event.request.headers['cookie']
	// 	},
	// 	credentials: 'include'
	// });

	// if (!response.ok) {
	// 	event.locals.user = null;
	// } else {
	// 	const result = await response.json();
	// 	event.locals.user = result;
	// }
	event.locals.user = mockUser;

	return resolve(event);
};

export const getSession: GetSession = request => {
	return {
		user: request.locals.user
	};
};
