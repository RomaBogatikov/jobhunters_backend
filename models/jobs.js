const mongoose = require('mongoose');

const jobsSchema = mongoose.Schema({
  agency: {type: String, required: true},
  business_title: {type: String, required: true},
  job_description: {type: String, required: true},
  url: {type: String},
  applied: {type: Boolean, default: false}
})


module.exports = mongoose.model('Job', jobsSchema);
