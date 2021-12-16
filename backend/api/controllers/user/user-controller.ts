import { Request, Response } from 'express';
import { userService } from '@services';
import { onError } from '@utils/ErrorUtil';
import logger from '@logger';
const getAllUsers = async (req: Request, res: Response) => {
    const users = await userService.findAll();

    res.status(200).json(users);

}

export {
    getAllUsers
}