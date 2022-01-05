import ApiError from '@errors/ApiError';
import { fetchGroupMessages } from '@services/message-service';
import { catchAsync } from '@utils/ErrorUtil';
import { Request, Response } from 'express';

export const getGroupMessages = catchAsync(async (req: Request, res: Response) => {
	const name = req.params.name;

	if (!name) throw new ApiError('Must specify a group name to query');

	const page = parseInt(`${req.query.page}`) || 1;
    // const cacheKey = `room-${name}`

    // const cachedMessages = cache.get(cacheKey);
    // if (cachedMessages) {
    //     console.log(`Cached results were hit for ${cacheKey}`);
    //     return res.json(cachedMessages);
    // }

	const messages = await fetchGroupMessages(name, page);

    // cache.put(cacheKey, messages, 1000 * 60)

	res.json(messages);
});
