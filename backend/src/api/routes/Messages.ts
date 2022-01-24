import ApiError from '@errors/ApiError';
import { createMessage, findChannelMessagesById } from '@services/message-service';
import { catchAsync } from '@utils/ErrorUtil';
import { Response, Request, Router } from 'express';

// TODO: Move into seperate file
const router = Router();
// router.get('/group/:name', getGroupMessages);

router.get(
	'/channel/:id',
	catchAsync(async (req: Request, res: Response) => {
		const channelId = parseInt(req.params.id, 10);
		if (!channelId) throw new ApiError('Invalid channel id');

		const messages = await findChannelMessagesById(channelId, 1);

		res.json(messages);
	})
);

router.post(
	'/channel/:id',
	catchAsync(async (req: Request<{ id: string }, unknown, { message: string; senderId: string }>, res: Response) => {
		const channelId = parseInt(req.params.id, 10);
		if (!channelId) throw new ApiError('Invalid channel id');

		if (!req.body.message) throw new ApiError('No valid message to send');

		const senderId = parseInt(req.body.senderId, 10);
		if (!senderId) throw new ApiError('No valid message to send');

		const messages = await createMessage(senderId, channelId, req.body.message);

		res.json(messages);
	})
);

export default router;
