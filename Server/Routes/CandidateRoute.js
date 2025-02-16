import express from "express";
import cors from "cors"
import multer from "multer";

import { verifyCandidateToken } from "../Utils/CanAuth.js";
import { fetchCandidateDetails, updateCandidateDetails } from "../Controller/Candidate/CandidateDetails.js";
import ImageUpload from "../Utils/ImageUpload.js";
import { CandidateImageupload, UploadImage, getImage } from "../Controller/Candidate/Can_Image.js";
import { domainSkillQuesGeneration, resumeQuesGeneration } from "../Controller/Candidate/QuesGeneration.js";
import { GeneratedQuesStore, fetchingQues } from "../Controller/Candidate/QuesGen.js";
import { OverallFeedback, fetchingFeedback, fetchingFeedbackList, gestureFeedback, savingGestureFeedback } from "../Controller/Candidate/Can-FeedBack.js";

const upload = multer({ storage: multer.memoryStorage() });

const CandidateRouter = express.Router()

CandidateRouter.use(cors())

CandidateRouter.use(express.urlencoded({ extended:true }))
CandidateRouter.use(express.json())

CandidateRouter.get("/Fetching-Candidate-Details", verifyCandidateToken, fetchCandidateDetails )
CandidateRouter.post("/Candidate-Profile-Update", verifyCandidateToken, updateCandidateDetails )

CandidateRouter.post("/Image-Upload-Database", ImageUpload.single("file") ,UploadImage )
CandidateRouter.post("/Image-Saved-to-candidate" , CandidateImageupload)
CandidateRouter.get("/file/:filename" , getImage)

CandidateRouter.post("/Domain-Skill-Generate-Questions", domainSkillQuesGeneration)
CandidateRouter.post("/Resume-Generate-Questions", upload.single('resume'), resumeQuesGeneration)

CandidateRouter.post("/Storing-Generate-Questions", GeneratedQuesStore)
CandidateRouter.get("/fetching-Generate-Questions", fetchingQues)

CandidateRouter.post("/Generating-Gesture-Feedback", gestureFeedback)
CandidateRouter.post("/Generating-Overall-Feedback", OverallFeedback)
CandidateRouter.post("/Saving-Gesture-Feedback", savingGestureFeedback)

CandidateRouter.get("/Fetching-Gesture-Feedback", fetchingFeedback)
CandidateRouter.get("/Fetching-Gesture-Feedback-List", fetchingFeedbackList)


export default CandidateRouter