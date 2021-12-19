import { NextFunction, Request, Response } from 'express';
import { userService } from '@services';
import { onError } from '@utils/ErrorUtil';
import logger from '@logger';
import ApiError from '@errors/ApiError';
import { validUserId } from '@middlewear/user-mw';
import * as friends from '@controllers/user/friend-controller';
import { catchAsync } from '@utils/ErrorUtil';

/* TODO: Implement async catch handler to avoid try { catch } blocks */
const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const allUsers = await userService.findAll();

        res.status(200).json(allUsers);
    } catch (error) {
        next(error);
    }
}

const getUserById = async (req: Request, res: Response, next: NextFunction) => {
    const userId = parseInt(req.params.id);

    if (!userId) return next(new ApiError('Invalid or missing query paramter id. Must be a number'));

    try {
        const user = await userService.findById(userId);

        /* Question: Should we handle unknown users on the backend or frontend? Is it an error? */
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
}


export {
    friends,
    getAllUsers,
    getUserById,
}