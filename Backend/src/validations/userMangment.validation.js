const Joi = require('joi');

const updateUserValidation = Joi.object({
    // accept both frontend keys (`username`, `email`) and older keys (`userName`, `userEmail`)
    username: Joi.string().optional(),
    email: Joi.string().email().optional(),
})

module.exports = {  updateUserValidation };
