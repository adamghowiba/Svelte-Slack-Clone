/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable consistent-return */
import cookie from 'cookie';
import signature from 'cookie-signature';
import prisma from '@controllers/db-controller';
import { Socket } from 'socket.io';

// eslint-disable-next-line import/prefer-default-export
export const validateUser = async (socket: Socket, next: (err?: any) => void) => {
	if (!socket.handshake.headers.cookie) return next(new Error('Invalid session cookie'));

	const raw = cookie.parse(socket.handshake.headers.cookie)['connect.sid'];
	if (!raw) return next(new Error('No valid session id'));

	const sessionId = signature.unsign(raw.slice(2), 'dk1m2k3m1kmdaw');
	if (!sessionId) return next('No valid session found');

	try {
		const user = await prisma.session.findUnique({
			where: {
				sid: sessionId
			},
			select: {
				data: true
			}
		});

		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
		const userData: { username: string; id: number } = JSON.parse(user.data).user;
		// eslint-disable-next-line no-param-reassign
		socket.user = userData;
		next();
	} catch (error) {
		next(`Connecting to socket failed ${error as string}`);
	}
};
