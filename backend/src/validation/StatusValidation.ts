import Joi from 'joi';

// eslint-disable-next-line import/prefer-default-export
export const statusValidation = Joi.object({
	status: Joi.string().optional().allow(null, ''),
	emoji: Joi.string().optional(),
	clearDate: Joi.date().optional()
}).min(1);
