const bcrypt = require('bcrypt')
const express = require('express');
const sessions = express.Router();
const User = require('../models/users.js')


sessions.post('/', (req, res) => {
    User.findOne({ username: req.body.username }, (err, foundUser) => {
        if (err) {
            res.status(500).send('uinternal error')
        }
        if (!foundUser) {
            res.status(401).send('wrong username or password!')
        } else if (bcrypt.compareSync(req.body.password, foundUser.password)) {
            req.session.currentUser = foundUser;
            res.status(200).send('logged In')
        } else {
            res.status(401).send('wrong username or password!')
        }
});
});



module.exports = sessions;