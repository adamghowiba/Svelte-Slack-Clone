import Joi from 'joi';

export const channelValidation = Joi.object({
	type: Joi.string().valid('private', 'public').insensitive().optional(),
	section: Joi.string().optional(),
	name: Joi.string().optional(),
	topic: Joi.string(),
	description: Joi.string(),
	senderId: Joi.number().optional(),
	receiverId: Joi.number().optional()
}).min(1);
