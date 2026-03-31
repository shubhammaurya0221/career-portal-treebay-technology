import Job from "../models/jobs.model.js";

// getting all jobs
export const getJobs = async (req, res) => {
  try {

    const jobs = await Job.find();

    res.status(201).json({
      success: true,
      data: jobs
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// create a new job
export const createJob = async (req, res) => {
  try {
    if (!req.body.job_title) {
      return res.status(400).json({
        success: false,
        message: "Job role required"
      });
    }
    const job = await Job.create(req.body);

    res.status(201).json({
      success: true,
      data: job
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// 