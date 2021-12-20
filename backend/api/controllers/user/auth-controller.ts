import { NextFunction, Request, Response } from 'express';
import { userService } from '@services';
import logger from '@logger';
import { User } from '@validation/UserValidation';
import ApiError from '@errors/ApiError';
import { catchAsync } from '@utils/ErrorUtil';


const register = catchAsync(async (req: Request, res: Response) => {
    const { error } = User.validate(req.body);

    if (error) throw new ApiError(error.message);

    const createdUser = await userService.createUser(req.body.username);

    res.status(200).send(createdUser);
});

const login = catchAsync(async (req: Request, res: Response) => {
    const { error } = User.validate(req.body);

    if (error) throw new ApiError(error.message);

    const foundUser = await userService.findByUsername(req.body.username);

    if (!foundUser) throw new ApiError(`Username ${req.body.username} does not exsist.`)
    
    req.session.user = foundUser;
    res.status(200).send(foundUser);
});


export {
    login,
    register
}