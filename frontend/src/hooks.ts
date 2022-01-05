import type { Handle, GetSession } from "@sveltejs/kit";

const mockUser = {
    username: 'adamscode',
    id: 1
}

export const handle: Handle = async ({ request, resolve }) => {
    request.locals.user = await fetch('http://localhost:5000/user/me', {
        headers: {
            'cookie': request.headers['cookie']
        },
        credentials: 'include'
    }).then(res => res.json()).catch(error => ({ error }))
    // request.locals.user = mockUser;

    if (request.locals.user.error) request.locals.user = null;

    return await resolve(request);
}

export const getSession: GetSession = (request) => {
    return {
        user: request.locals.user
    }
}