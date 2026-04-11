import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  job_title: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  jobType: {
    type: String,
    enum: ['Full-time', 'Part-time', 'Contract', 'Internship'],
    required: true  
  },
  salary: {
    type: Number,
  },
  description: {
    type: String,
    required: true
  },
  requirements : {
    type : [String],
    required: true
  },
},{timestamps: true});

const Job = mongoose.model("Job", jobSchema);
export default Job;