import express from "express";
import { verifyCandidateToken } from "../Utils/CanAuth.js";
import { fetchCandidateDetails, updateCandidateDetails } from "../Controller/Candidate/CandidateDetails.js";
import ImageUpload from "../Utils/ImageUpload.js";
import { CandidateImageupload, UploadImage, getImage } from "../Controller/Candidate/Can_Image.js";

const CandidateRouter = express.Router()

CandidateRouter.use(express.urlencoded({ extended:true }))
CandidateRouter.use(express.json())

CandidateRouter.get("/Fetching-Candidate-Details", verifyCandidateToken, fetchCandidateDetails )
CandidateRouter.post("/Candidate-Profile-Update", verifyCandidateToken, updateCandidateDetails )
CandidateRouter.post("/Image-Upload-Database", ImageUpload.single("file") ,UploadImage )
CandidateRouter.post("/Image-Saved-to-candidate" , CandidateImageupload)

CandidateRouter.get("/file/:filename" , getImage)

export default CandidateRouter