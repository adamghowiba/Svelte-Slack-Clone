import { Request, Response } from 'express';
import { userService } from '@services';
import * as status from '@controllers/user/status-controller';
import ApiError from '@errors/ApiError';
import { catchAsync } from '@utils/ErrorUtil';
import { findAllPrivate } from '@services/channel-service';

// TODO: Implement async catch handler to avoid try { catch } blocks
const getAllUsers = catchAsync(async (req: Request, res: Response) => {
	const allUsers = await userService.findAll();

	res.status(200).json(allUsers);
});

const getUserById = catchAsync(async (req: Request, res: Response) => {
	const userId = parseInt(req.params.id, 10);

	if (!userId) throw new ApiError('Invalid or missing query paramter id. Must be a number');

	const user = await userService.findById(userId);

	/* TODO: Should we handle unknown users on the backend or frontend? Is it an error? */
	res.status(200).json(user);
});

const getAllUserChannels = catchAsync(async (req: Request, res: Response) => {
	const userId = parseInt(req.params.id, 10);

	if (!userId) throw new ApiError('Invalid or missing query paramter id. Must be a number');

	const userChannels = await findAllPrivate(userId);

	res.status(200).json(userChannels);
});

export { getAllUserChannels, getAllUsers, getUserById, status };
