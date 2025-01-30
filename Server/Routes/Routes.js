import express from "express";
import { candidateRegister } from "../Controller/Register.js";

const Router = express.Router()

Router.use(express.urlencoded({ extended:true }))
Router.use(express.json())

Router.post("/Candidate/Register", candidateRegister)

export default Router