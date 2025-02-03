import express from "express";
import { verifyCandidateToken } from "../Utils/CanAuth.js";
import { fetchCandidateDetails } from "../Controller/Candidate/CandidateDetails.js";

const CandidateRouter = express.Router()

CandidateRouter.use(express.urlencoded({ extended:true }))
CandidateRouter.use(express.json())

CandidateRouter.get("/Fetching-Candidate-Details", verifyCandidateToken, fetchCandidateDetails )

export default CandidateRouter