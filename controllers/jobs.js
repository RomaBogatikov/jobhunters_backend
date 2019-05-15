const express = require('express')
const jobs = express.Router()
const User = require('../models/users')
const Job = require('../models/jobs')
const mongoose = require('mongoose')

// INDEX ROUTE
jobs.post('/', (req, res) => {
    User.findOne({
        username: req.body.username
    }, (err, foundUser) => {
        if (err) {
            res.status(400).send({error: err.message})
        }
        // convert jobs ids from stings to document ids
        const jobsIds = foundUser.jobs.map(job => {
            return mongoose.Types.ObjectId(job)
        })
        // get jobs that are in user jobs array
        Job.find({
            '_id': {$in: {jobsIds}}
        }, (err, foundJobs) => {
            if (err) {
                res.status(400).send({error: err.message})
            }
            res.status(200).send(foundJobs)
        })
    })
})


// CREATE ROUTE - TESTED AND CONFIRMING CREATE ROUTE WORKS (DEVIN)
jobs.post('/create', (req, res) => {
    // res.send('create route hit!')
    console.log('req is', req.body)
    // console.log('req session is', req.session)
    const user = req.body.username
    console.log('user is', user)
    delete req.body.username
    console.log('new req.body is', req.body)
    Job.create(req.body, (error, createdJob) => {
        if (error) {
          res.status(400).json({ error: error.message });
        } else {
          console.log('createdJob=', createdJob);
          User.findOneAndUpdate(
            {username: user},
            {
                $push: {jobs: createdJob._id}
            },
            {new: true},
            (err, updatedUser) => {
                console.log(updatedUser)
                res.status(200).send(createdJob)
            }
            )
        }
    })
})

// destroy route (DELETE) - TESTED AND CONFIRMING EDIT ROUTE WORKS (DEVIN)
jobs.delete('/:id', (req, res) => {
    Job.findByIdAndRemove(req.params.id, (err, deletedJob) => {
        if (err) {
        res.status(400).json({ error: err.message });
        } else {
            User.findOneAndUpdate(
                {username: req.body.username},
                {
                    $pull: {jobs: deletedJob._id}
                },
                {new: true},
                (err, updatedUser) => {
                    console.log(updatedUser)
                    res.status(200).send(deletedJob)
                }
            )
        // res.status(200).json(deletedJob);
        }
    })
})

// update route (PUT) - TESTED AND CONFIRMING UPDATE ROUTE WORKS (DEVIN)
jobs.put('/:id', (req, res) => {
    Job.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedJob) => {
        if (err) {
        res.status(400).json({ error: err.message });
        } else {
        res.status(200).json(updatedJob);
        }
    })
})



module.exports = jobs
