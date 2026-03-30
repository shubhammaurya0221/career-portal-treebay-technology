import express from "express";
import { getJobs, createJob } from "../controller/job.controller.js";

const JobRouter = express.Router();

JobRouter.get("/get", getJobs);
JobRouter.post("/create", createJob);

export default JobRouter;