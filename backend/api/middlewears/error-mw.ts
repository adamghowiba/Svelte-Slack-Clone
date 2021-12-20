import { DatabaseError } from '@errors/DatabaseError';
import { ICustomError } from '@errors/ICustomError';
import logger from '@logger';
import { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';

/* TODO: Handle JOI errors */

/* 404 Error */
export const notFoundError = ((req: Request, res: Response, next: NextFunction) => {
    next(createError(404));
});

/* API Error */
export const apiError = ((err: any, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof DatabaseError) {
        const { status, statusCode, message } = err;
        return res.status(err.statusCode).json({ status, message, statusCode });
    }

    if (err instanceof ICustomError && process.env.NODE_ENV == 'development') {
        const { message, stack, isOperational, status } = err;

        logger.error(`${err.status}: ${err.message}`);
        return res.status(err.statusCode).json({ status, message, isOperational, stack });
    }
    return res.status(400).json({ status: err.status, message: err.message });
});
