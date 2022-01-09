import type { Handle, GetSession } from '@sveltejs/kit';

const mockUser = {
	username: 'adamscode',
	id: 1
};

export const handle: Handle = async ({ request, resolve }) => {
	const response = await fetch('http://localhost:5000/user/me', {
		headers: {
			cookie: request.headers['cookie']
		},
		credentials: 'include'
	});

	if (!response.ok) {
		request.locals.user = null;
		return await resolve(request);
	}

	const result = await response.json();
	request.locals.user = result;
	return resolve(request);
};

export const getSession: GetSession = request => {
	return {
		user: request.locals.user
	};
};
