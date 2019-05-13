const mongoose = require('mongoose');

const jobsSchema = mongoose.Schema({
  agency: {type: String, required: true},
  business_title: {type: String, required: true},
  job_description: {type: String, required: true},
  salary_range_from: {type: String},
  salary_range_to: {type: String},
  work_location: {type: String}
})


module.exports = mongoose.model('Job', jobsSchema);
