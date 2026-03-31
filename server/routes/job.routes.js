import express from "express";
import { getJobs, createJob } from "../controller/job.controller.js";

const JobRouter = express.Router();

JobRouter.get("/", getJobs);
JobRouter.post("/", createJob);

export default JobRouter;