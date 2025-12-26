const db = require("../models");
const User = db.users;

const { Op } = require('sequelize')
const { pagination } = require("../utils/pagination");

const getUser = async (req, res) => {
    try {
        const user = await User.findOne({
            where: { id: req.params.id },
        });
        if (!user) {
            return res.status(404).send({ success: false, message: "User not found." });
        }
        return res.status(200).send({ success: true, message: "User retrieved successfully.", data: user });
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Internal server error." })
    }
}

const getAllUser = async (req, res) => {
    try {
        const { page, limit } = req.query;
        const paginate = pagination(page, limit)
        const userCount = await User.count()
        const users = await User.findAll({
            order: [
                ['id', 'DESC'],
            ],
            offset: paginate.offset,
            limit: paginate.pageSize,
        });
        return res.status(200).send({ success: true, message: "All users retrieved successfully.", data: { count: userCount, rows: users } });
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Internal server error." })
    }
}

const updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const isExisting = await User.findOne({ where: { id: userId } });
        if (!isExisting) {
            return res.status(404).send({ success: false, message: "User not found." });
        }
        const { username, email } = req.body;


        const updateData = {};
        // allow updating username/email with uniqueness checks
        if (username !== undefined) {
            const existingUserByUsername = await User.findOne({ where: { username, id: { [Op.ne]: userId } } });
            if (existingUserByUsername) {
                return res.status(400).send({ success: false, message: "Username already exists." });
            }
            updateData.username = username;
        }
        if (email !== undefined) {
            const existingUserByEmail = await User.findOne({ where: { email, id: { [Op.ne]: userId } } });
            if (existingUserByEmail) {
                return res.status(400).send({ success: false, message: "Email already exists." });
            }
            updateData.email = email;
        }
        await User.update(updateData, { where: { id: req.params.id } });

        const updated = await User.findOne({ where: { id: req.params.id }});
        return res.status(200).send({ success: true, message: "User updated successfully.", data: { user: updated } });
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Internal server error." })
    }
}



module.exports = { getAllUser, updateUser, getUser }