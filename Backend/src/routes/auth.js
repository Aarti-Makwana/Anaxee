const express = require('express');
const router = express.Router();
const { signup, login,updateProfile } = require('../controllers/auth');
const validate = require("../middlewares/validate");
const { signupValidation, loginValidation } = require("../validations/users.validation");
const { updateProfileValidation } = require("../validations/users.validation");
const { authenticate } = require("../middlewares/authentication");

router.post(
'/signup',
 validate(signupValidation),
 signup);

router.post(
    '/login', 
    validate(loginValidation), 
    login);

router.put(
    '/profile', 
    authenticate, 
    validate(updateProfileValidation), 
    updateProfile
);

module.exports = router;