import Joi from "joi";


export const QueryParams = Joi.object({
    type: Joi.string().valid('outgoing', 'incoming', 'all').optional()
})
