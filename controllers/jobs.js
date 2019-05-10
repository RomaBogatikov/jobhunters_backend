const express = require('express')
const jobs = express.Router()

// INDEX ROUTE
jobs.get('/', (req, res) => {
    res.send('hello from the jobs controller')
})


// CREATE ROUTE
jobs.post('/', (req, res) => {
    res.send('create route hit!')
})


module.exports = jobs