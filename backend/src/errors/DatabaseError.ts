import { ICustomError } from '@errors/ICustomError';
import { Prisma } from '@prisma/client';
import { PrismaClientKnownRequestError, PrismaClientUnknownRequestError, PrismaClientValidationError } from '@prisma/client/runtime';

/* Different Prisma Errors:

- PrismaClientKnownRequestError
- PrismaClientUnknownRequestError
- PrismaClientRustPanicError
- PrismaClientInitializationError
- PrismaClientValidationError
*/

type KnownErrorType = 'duplicate' | 'notfound';

/* TODO Implement or delete */
export const parseErrorMessages = (code: string): KnownErrorType => {
	switch (code) {
		case 'P2003':
			return 'notfound';
		case 'P2002':
			return 'duplicate';
	}
};

export class DatabaseError extends Error {
	message: string;
	status: string;
	statusCode: number;

	constructor(error: any) {
		super(error);

		this.message = error.message ?? error;
		this.statusCode = 500;

		if (error instanceof PrismaClientKnownRequestError) {
			this.status = error.code;
		}

		if (error instanceof PrismaClientUnknownRequestError) {
			this.status = 'unknown';
		}

		// TODO: Should this be an operational error
		if (error instanceof PrismaClientValidationError) {
		}

		Error.captureStackTrace(this, this.constructor as typeof DatabaseError);
	}
}
