import express from "express"
import cors from "cors"
import { verifyExpertToken } from "../Utils/ExpAuth.js"
import { fetchingCareerPackage, fetchingInterviewPackage, fetchingPriorityDMPackage, fetchingResumePackage, updatingCareerPackage, updatingInterviewPackage, updatingPriorityDMPackage, updatingResumePackage } from "../Controller/Expert/Packages.js"
import { AddingTimings, FetchingTimings, deletingTimeData } from "../Controller/Expert/Availability.js"

const ExpertRouter = express.Router()

ExpertRouter.use(cors())
ExpertRouter.use(express.json())
ExpertRouter.use(express.urlencoded({extended:true}))

ExpertRouter.get("/Fetching-Interview-Package-Details", fetchingInterviewPackage)
ExpertRouter.post("/Updating-Interview-Package-Details", updatingInterviewPackage)

ExpertRouter.get("/Fetching-Career-Package-Details", fetchingCareerPackage)
ExpertRouter.post("/Updating-Career-Package-Details", updatingCareerPackage)

ExpertRouter.get("/Fetching-Resume-Package-Details", fetchingResumePackage)
ExpertRouter.post("/Updating-Resume-Package-Details", updatingResumePackage)

ExpertRouter.get("/Fetching-PriorityDM-Package-Details", fetchingPriorityDMPackage)
ExpertRouter.post("/Updating-PriorityDM-Package-Details", updatingPriorityDMPackage)

ExpertRouter.post("/Adding-Availability-Timing", AddingTimings)
ExpertRouter.get("/Fetching-Availability-Timing", FetchingTimings)
ExpertRouter.delete("/Delete-Availability-Timing", deletingTimeData)

export default ExpertRouter