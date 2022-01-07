import { getGroupMessages } from '@controllers/chat-controller';
import ApiError from '@errors/ApiError';
import { createMessage, findChannelMessagesById } from '@services/message-service';
import { catchAsync } from '@utils/ErrorUtil';
import { Response, Request, Router } from 'express';
const router = Router();

// router.get('/group/:name', getGroupMessages);

router.get(
	'/channel/:id',
	catchAsync(async (req: Request, res: Response) => {
		const channel_id = parseInt(req.params.id);
		if (!channel_id) throw new ApiError('Invalid channel id');

		const messages = await findChannelMessagesById(channel_id, 1);

		res.json(messages);
	})
);

router.post(
	'/channel/:id',
	catchAsync(async (req: Request, res: Response) => {
		const channel_id = parseInt(req.params.id);
		if (!channel_id) throw new ApiError('Invalid channel id');

		const message = req.body.message;
		if (!message) throw new ApiError('No valid message to send');

		const senderId = parseInt(req.body.senderId);
		if (!senderId) throw new ApiError('No valid message to send');

		const messages = await createMessage(senderId, channel_id, message);

		res.json(messages);
	})
);

export default router;
