import Joi from "joi"

export const requestBody = Joi.object({
    toUserId: Joi.number(),
    status: Joi.string().valid('pending', 'accepted', 'blocked', 'denied').alter({
        put: (schema) => schema.required(),
        post: (schema) => schema.optional()
    })
})