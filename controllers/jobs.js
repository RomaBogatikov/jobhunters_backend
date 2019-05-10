const express = require('express')
const jobs = express.Router()
const Job = require('../models/jobs')

// INDEX ROUTE
jobs.get('/', (req, res) => {
    Job.find({}, (err, foundJobs) => {
        if (err) {
            res.status(400).send({error: err.message})
        }
        res.status(200).send(foundJobs)
    })
})


// CREATE ROUTE
jobs.post('/', (req, res) => {
    res.send('create route hit!')
})


module.exports = jobs