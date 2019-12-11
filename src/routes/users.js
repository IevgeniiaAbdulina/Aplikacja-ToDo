// Add user to database 
const User = require("../models/user");
const express = require("express");
const _ = require('lodash');
const bcrypt = require('bcrypt');
const router = express.Router();

router.post('/', async (req, res) => {
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ login: req.body.login });
    if (user) return res.status(400).send('That user already exists!');

    user = new User(_.pick(req.body, ['login', 'password']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    res.send(_.pick(user, ['_id', 'login']));
});

module.exports = router;