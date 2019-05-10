// const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
const PORT = 3003
const app = express()

//Middleware
app.use(express.json()); //use .json(), not .urlencoded()

// Error / Disconnection
mongoose.connection.on('error', err => console.log(err.message + ' is Mongod not running?'))
mongoose.connection.on('disconnected', () => console.log('mongo disconnected'))

// Database connection
mongoose.connect('mongodb://localhost:27017/jobs', { useNewUrlParser: true })
mongoose.connection.once('open', () => {
  console.log('connected to mongoose...')
})

//CONTROLLER_ROUTES
const jobsController = require ('./controllers/jobs.js')
app.use('/jobs', jobsController)

// INDEX ROUTE
app.get('/', (req, res) => {
   res.send('Hello World')
  })

//Listener
app.listen(PORT, () => {
    console.log('Hello World', PORT)
})