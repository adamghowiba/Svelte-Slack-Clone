import ApiError from '@errors/ApiError';
import { ChannelType } from '@prisma/client';
import {
	checkPrivateExists,
	createPrivate,
	createPublic,
	findAllChannels,
	findAllPublic,
	findById,
} from '@services/channel-service';
import { catchAsync } from '@utils/ErrorUtil';
import { channelValidation } from '@validation/ChannelValidation';
import { Request, Response, NextFunction } from 'express';

// TODO: Add query paramters for filtering & pagnation
export const getAllChannels = catchAsync(async (req: Request, res: Response) => {
	const group = req.query.group;
	if (group && group !== 'section') throw new ApiError('Invalid channel group');

	if (group == 'section') {
		const groupedChannels = await findAllChannels(group);

		return res.json(groupedChannels);
	}

	const channels = await findAllPublic();
	return res.status(200).json(channels);
});

export const getChannelById = catchAsync(async (req: Request, res: Response) => {
	const channelId = parseInt(req.params.id);
	if (!channelId) throw new ApiError('Valid channel ID is required');

	const channels = await findById(channelId);

	return res.status(200).json(channels);
});

interface ChannelBody {
	name?: string;
	section?: string;
	type: keyof typeof ChannelType;
	senderId: string;
	receiverId: string;
}

export const postChannel = catchAsync(async (req: Request<any, any, ChannelBody>, res: Response) => {
	const { error } = channelValidation.validate(req.body);
	if (error) throw new ApiError(error.message);

	const type = req.body.type.toUpperCase() as ChannelType;

	if (type == 'PRIVATE') {
		const senderId = parseInt(req.body.senderId);
		const receiverId = parseInt(req.body.receiverId);

		if (!senderId || !receiverId) throw new ApiError('Private channels must have a senderId & receiverId');

		const privateChannelExsits = await checkPrivateExists(senderId, receiverId);
		if (privateChannelExsits) throw new ApiError("You're already in a private chat with that user");

		const privateChannel = await createPrivate(senderId, receiverId);

		return res.status(200).json(privateChannel);
	}

	if (type == 'PUBLIC') {
		if (!req.body.name) throw new ApiError('Public channels must have a name');

		const publicChannel = await createPublic(req.body.name, req.body.section);

		return res.status(200).json(publicChannel);
	}
});

export const putChannel = catchAsync(async (req: Request, res: Response) => {});

export const deleteChannel = catchAsync(async (req: Request, res: Response) => {});
