import express from "express";
import { createApplicant } from "../controller/applicant.controller.js";

const ApplicationRouter = express.Router();

ApplicationRouter.post("/apply", createApplicant);

export default ApplicationRouter;
