const express = require('express');
const router = express.Router();
const userController = require("../controllers/user");
const validate = require("../middlewares/validate");
const { authenticate } = require("../middlewares/authentication");
const { updateUserValidation } = require("../validations/userMangment.validation")

router.route('/allusers')
    .get(authenticate, userController.getAllUser);

router.route('/:id')    
        .get(authenticate, userController.getUser)

router.route('/:id')    
    .put(authenticate,  validate(updateUserValidation), userController.updateUser);

module.exports = router;
