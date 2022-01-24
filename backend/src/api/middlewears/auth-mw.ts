import ApiError from '@errors/ApiError';
import { Request, Response, NextFunction } from 'express';

export default (req: Request, res: Response, next: NextFunction) => {
	if (!req.session.user) next(new ApiError('Unauthorized, you must be logged in.'));

	next();
};
