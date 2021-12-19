import { PrismaClientKnownRequestError, PrismaClientUnknownRequestError, PrismaClientValidationError } from "@prisma/client/runtime";

type PrismaErrors = PrismaClientValidationError | PrismaClientKnownRequestError | PrismaClientUnknownRequestError;

export abstract class IDatabseError extends Error {
    abstract isOperational: boolean;
    message: string;
    status: string;
    statusCode: number;

    constructor(error: PrismaErrors) {
        super('Database error occured');

        if (error instanceof PrismaClientKnownRequestError) {
            this.status = error.code;
            this.message = error.message;
        }

        this.statusCode = 500;
        Error.captureStackTrace(this, (this.constructor as typeof IDatabseError));
    }
}

