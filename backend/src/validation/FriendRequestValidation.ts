import Joi from 'joi';

// eslint-disable-next-line import/prefer-default-export
export const QueryParams = Joi.object({
	type: Joi.string().valid('outgoing', 'incoming', 'all').optional()
});
