import Job from "../models/jobs.model.js";

export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createJob = async (req, res) => {
  try {
    if (!req.body.jobRole) {
      return res.status(400).json({ message: "Job role required" });
    }

    const job = await Job.create(req.body);

    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};