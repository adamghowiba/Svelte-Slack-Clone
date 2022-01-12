import Joi from "joi";

export const channelValidation = Joi.object({
    type: Joi.string().valid('private', 'public').insensitive().required(),
    section: Joi.string().optional(),
    name: Joi.string().optional(),
    senderId: Joi.number().optional(),
    receiverId: Joi.number().optional()
})