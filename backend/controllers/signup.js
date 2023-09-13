const mongoose = require('mongoose');
const user = require('../models/signup');

const findUser = async (req, res) => {
    try {
        const users = await user.find();
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send(error.message);

    }

}

const signup = async (req, res) => {
    const { username, password } = req.body;
    await user.create({ username, password });
    res.json({ message: 'Success' });
}

module.exports = {
    signup,
    findUser
}