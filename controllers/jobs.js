const express = require('express')
const jobs = express.Router()

jobs.get('/', (req, res) => {
    res.send('hello from the jobs controller')
})


module.exports = jobs