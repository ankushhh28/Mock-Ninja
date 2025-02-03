import express from "express";
import { candidateRegister, interviewerRegister } from "../Controller/Register.js";
import { GoogleLogin, Login } from "../Controller/Login.js";
import { ForgotPasswordEmailSend, OTPverification, PasswordChange } from "../Controller/ForgotPassword.js";

const Router = express.Router()

Router.use(express.urlencoded({ extended:true }))
Router.use(express.json())

Router.post("/Candidate/Register", candidateRegister)
Router.post("/Interviewer/Register", interviewerRegister)
Router.post("/Login", Login)
Router.post("/Google-Login", GoogleLogin)
Router.post("/ForgotPassword/mail-send", ForgotPasswordEmailSend)
Router.post("/OTP/Verification", OTPverification)
Router.post("/Password/Change", PasswordChange)

export default Router