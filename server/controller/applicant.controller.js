import Applicant from "../models/applicant.modal.js";

export const createApplicant = async (req, res) => {
  try {
    console.log(req.body)
    const applicant = await Applicant.create(req.body);

    res.status(201).json({
      success: true,
      data: applicant
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};