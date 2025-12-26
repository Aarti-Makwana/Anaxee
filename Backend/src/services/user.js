const User = require("../models").users;
const Token = require('../models').tokens;
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');


const getUser = async (filter, excludeFields = []) => {
    return await User.findOne({
        attributes: { exclude: excludeFields },
        where: filter
    }, { raw: true });
}

const createUser = async (userData) => {
    const salt = bcrypt.genSaltSync(10);
    const encryptedPassword = await bcrypt.hash(userData.password, salt);
    const user = await User.create({ ...userData, password: encryptedPassword });
    return user;
}

const updateUser = async (userId, updateData) => {
    const data = { ...updateData };
    if (data.password) {
        const salt = bcrypt.genSaltSync(10);
        data.password = await bcrypt.hash(data.password, salt);
    }
    await User.update(data, { where: { id: userId } });
    return await getUser({ id: userId }, ['password']);
}

const generateToken = async (userId) => {
    const token = JWT.sign({ id: userId }, process.env.JWT_SECRET_KEY, { expiresIn: '2h' });
    await Token.create({ user: userId, token: token });
    return token;
}

module.exports = { getUser, createUser, generateToken, updateUser }