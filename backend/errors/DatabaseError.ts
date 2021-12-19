import { ICustomError } from '@errors/IApiError';
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
            return 'notfound'
        case 'P2002':
            return 'duplicate'
    }
}

export class DatabaseError extends Error {
    message: string;
    status: string;
    statusCode: number;

    constructor(error: any) {
        super('Database error occured');

        this.message = error.message;
        this.statusCode = 500;

        if (error instanceof PrismaClientKnownRequestError) {
            this.status = error.code;
        }

        if (error instanceof PrismaClientUnknownRequestError) {
            this.status = 'unknown';
        }

        /* TODO: Should this be an operational error */
        if (error instanceof PrismaClientValidationError) {
        }

        Error.captureStackTrace(this, (this.constructor as typeof DatabaseError));
    }
}


/**
 * When the database request entry was invalid & not handled by the service layer.
 * @constructor
 */
export class InvalidFormat extends ICustomError {
    entry: string | number;
    isOperational: boolean;

    /**
     * @param {any} entry The user entry that was attempted. 
     * @default message '`entry` is not a valid request format.'
     */
    constructor(entry?: any) {
        const message = `${entry} is not a valid request format.`
        super(message)

        this.isOperational = true;
    }
}
