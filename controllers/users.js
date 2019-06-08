const bcrypt = require('bcrypt');
// const cors = require('cors')
const express = require('express');
const jwt = require('jsonwebtoken')
const user = express.Router();
const User = require('../models/users.js')
const cookieParser = require('cookie-parser')
const withAuth = require('../middleware_auth.js');

user.use(cookieParser())
// user.use(cors())

// a route to check if the user has a valid token
user.get('/checkToken', withAuth, (req, res) => {
  console.log('checkToken req=', req.cookies)
  res.sendStatus(200)
})

// post route to log in an existing user
user.post('/authenticate', (req, res) => {
  console.log('authenticate route');

  User.findOne({ username: req.body.username }, (err, foundUser) => {
    if (err) {
        res.status(500).send('internal error')
    }
    if (!foundUser) {
        res.status(401).send('wrong username or password!')
    // if password matches
    } else if (bcrypt.compareSync(req.body.password, foundUser.password)) {
      // issue a token
      const payload = {username: foundUser.username};
      const token = jwt.sign(payload, process.env.SECRET, { expiresIn: '1h' });
      res.cookie('token', token, { httpOnly: true });
      res.sendStatus(200);

        // req.session.currentUser = foundUser;
        // res.status(200).send('logged In')
    } else {
        res.status(401).send('wrong username or password!')
    }
});

  // try {
  //   // find a user in the database by username
  //   const foundUser = await User.find({username: req.body.username});

  //   // if no user was found, send an error message
  //   if (!foundUser) {
  //     res.status(401).json({
  //       error: 'Incorrect email or password'
  //     })
  //   } else {

  //   }

  // } catch(error) {
  //   console.error(error)
  // }
})

// post route (to sign up a new user with auto log in)
user.post('/', async (req, res) =>{
    console.log('post route to sign up', req.body)
    // we wait for User.find to resolve (to find the user in the database with the same username)
    try {
    const foundUsers = await User.find({username: req.body.username});

    // if the user was found, we check if the password from user input matches the password in the database
    if (foundUsers.length > 0 && bcrypt.compareSync(req.body.password, foundUsers[0].password)) {
      // if there is a match, that user signed up before
      res.status(500).send('You signed up before. Go to Log In.')
    } else if (foundUsers.length > 0) {
      res.status(500).send('User with such a username already exists. Pick a different username')
    } else {
      // the user is new, create a new user and log in automatically
      req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))

      User.create(req.body, (err, createdUser) => {
        if (err) {
          console.log(err)
          res.status(500).send('Error registering new user')
        } else {
          // the line below is needed for auto logging in a new user when using express sessions
          // req.session.currentUser = createdUser;
          // console.log('new user was created');
          // res.status(200).json({success: 'New user created!'})

          /////////////////////
          ///to log in with jwt
          /////////////////////
          // issue token
          console.log('createdUser.username=', createdUser.username)
          const payload = { username: createdUser.username };
          console.log('payload=', payload)
          console.log("SECRET=", process.env.SECRET)
          const token = jwt.sign(payload, process.env.SECRET, {
            expiresIn: '1h'
          });
          // console.log('token=', token);
          // res.header("Access-Control-Allow-Credentials","true");
          // res.header("Access-Control-Allow-Origin", "http://localhost:3000")
//           res.header('Access-Control-Allow-Credentials', true);
// res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');

          // httpOnly is set to true for better security (protection against XSS attacks)
          res.cookie('token', token, { httpOnly: true })
          // console.log('res=', res)
          res.sendStatus(200)
          // res.status(200).send({ auth: true, token: token})
        }
      })
    }
  } catch(error) {
    console.error(error)
  }
})

module.exports = user;
