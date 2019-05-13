const express = require('express');
const user = express.Router();

user.get('/jobs', (req, res) => {
    // res.render('ENTER THE CORRECT ROUTE HERE');
});

user.post('/', (req, res) =>{
 console.log(req.body);
 
  
})

module.exports = router;