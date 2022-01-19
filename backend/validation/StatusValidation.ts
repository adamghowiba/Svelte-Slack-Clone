import Joi from 'joi';

export const statusValidation = Joi.object({
	status: Joi.string().optional(),
	emoji: Joi.string().optional(),
	clearDate: Joi.date().optional(),
}).min(1);
