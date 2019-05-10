const express = require('express')
const app = express()

const PORT = 3003

//Middleware
app.use(express.json()); //use .json(), not .urlencoded()

//Routes
// Index Route
app.get('/', (req, res) => {
   res.send('Hello World')
  })

//Listener
app.listen(PORT, () => {
    console.log('Hello World', PORT)
})