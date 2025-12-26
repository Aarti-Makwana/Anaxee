const Joi = require('joi');

const signupValidation = Joi.object({
    username: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    mobile: Joi.string(),
})

const loginValidation = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
})

const updateProfileValidation = Joi.object({
    username: Joi.string().min(2).max(50).allow(''),
    password: Joi.string().allow(''),
    mobile: Joi.string().allow(''),
}).unknown(true);

module.exports = { signupValidation, loginValidation, updateProfileValidation }