// models/Job.js
import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  job_title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true
  },
  jobType: {
    type: ['Full-time', 'Part-time', 'Contract', 'Internship'],
    required: true  
  },
},{timestamps: true});

const Job = mongoose.model("Job", jobSchema);
export default Job;