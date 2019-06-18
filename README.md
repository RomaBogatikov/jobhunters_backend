# JobHunters
Link to app: [JobHunters](https://jobs-hunter.herokuapp.com/)

## Job Hunters Back-End Overview
Link to [Front-End Overview](https://github.com/RomanBogatikov/jobhunters_frontend/tree/master)

Job Hunters removes the friction of having to visit multiple job platforms or search your inbox to find your dream job!

The Job Hunters application solves the problem of job seekers searching for jobs online and not having a simple way to save the jobs they are interested in. As employers distribute jobs across the internet, job seekers can come across jobs anywhere. Prior to Job Hunters, one of the ways to save a job was to email yourself the link.

Users can add the company name, job title, role description and a link to the online application. The added jobs are then saved to the “Jobs Inbox.” A user can directly access the job link to apply and update their jobs inbox to reflect so.


## Technical Details

To build the back-end of the Jobs Hunter application we used Express.js, Node.js. MongoDB, and Mongoose. There are routes to handle user login as well as full CRUD implementation for jobs the users wants to view and create.

The technical challenges we experienced to build the back-end were:

* Creating a relationship between the users model and the jobs model in the database

* Pulling all of the jobs the user has added to the frontend for rendering in the browser

* Creating a relationship between our backend and front end while working on both localhost ports and heroku deployment

* Allowing cross-origin access for requests between our frontend and backend

## Improvements

The project had a deadline of six days to build. If granted more time, we would build out ...

* Better relation between our database models. When looking at the app and the tasks it performs, having the jobs model nested in the users in a one-to-many relationship would be a better implementation.

* User authentication is not enabled through express-sessions. We were not able to store the user session through this method despite having success in past projects of a similar stack. With more time, we could debug and create a better solution to store user session via Express resulting in a smoother implementation of user authorization.


P.S. JobHunters was a group project (group of 3) where I worked mostly on user login/signup and backend routes</p>
