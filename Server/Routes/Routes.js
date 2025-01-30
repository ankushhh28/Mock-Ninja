import express from "express";
import { candidateRegister, interviewerRegister } from "../Controller/Register.js";
import { Login } from "../Controller/Login.js";

const Router = express.Router()

Router.use(express.urlencoded({ extended:true }))
Router.use(express.json())

Router.post("/Candidate/Register", candidateRegister)
Router.post("/Interviewer/Register", interviewerRegister)
Router.post("/Login", Login)

export default Router