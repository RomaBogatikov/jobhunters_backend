const bcrypt = require('bcrypt');
const express = require('express');
const user = express.Router();
const User = require('../models/users.js')
const session = require('express-session');

user.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}))

user.get('/jobs', (req, res) => {
    // res.render('ENTER THE CORRECT ROUTE HERE');
});

user.post('/', (req, res) =>{
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
    console.log(req.body);
    
    User.create(req.body, (err, createdUser) => {
      if (err) {
        console.log(err)
        res.status(500).send('Error registering new user')
      } else {
        res.status(200).send('New user created!')
        req.session.currentUser = createdUser;
    }
     
  
    }) 
})

module.exports = user;