import express from "express"
import cors from "cors"

const ExpertRouter = express.Router()

ExpertRouter.use(cors())
ExpertRouter.use(express.json())
ExpertRouter.use(express.urlencoded({extended:true}))

export default ExpertRouter