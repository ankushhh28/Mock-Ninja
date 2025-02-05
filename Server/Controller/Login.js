import UserRegisterSchema from "../Models/userRegisterSchema.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const Login = async(req, res) => {
  
  const {email, password } = req.body
  const Access_Token = process.env.ACCESS_TOKEN
  const Refresh_Token = process.env.REFRESH_TOKEN

  try {

    const user = await UserRegisterSchema.findOne({
      $or: [
        {candidateEmail: email},
        {expertOrgEmail: email }
      ]
    })

    if(!user){
      return res.status(404).json({message:"User Not Found"})
    }

    const matchPassword = await bcrypt.compare(password, user.expertPassword ? user.expertPassword : user.candidatePassword)

    if(matchPassword){
      const accessToken = jwt.sign({
        name: user.candidateName || user.expertName, 
        role: user.role
      }, 
        Access_Token, 
        {expiresIn:"24h"})
      const refreshToken = jwt.sign({
        name: user.candidateName || user.expertName, 
        role: user.role
      }, Refresh_Token)
  
      return res.status(200).json({
        accessToken, 
        refreshToken, 
        name: user.candidateName || user.expertName, 
        email: user.candidateEmail || user.expertOrgEmail,
        role:user.role})
    }
    else{
      return res.status(400).json({message:"Password is Incorrect"})
    }

  } catch (error) {
    // console.error("ERROR OCCURED IN LOGIN", error)
    res.status(500).json({msg:"SOMETHING WENT WRONG"})
  }
}

// -------------------------- LOGIN FROM GOOGLE ----------------------------

export const GoogleLogin = async(req,res) => {
  const {email, name} = req.body
  const Access_Token = process.env.ACCESS_TOKEN
  const Refresh_Token = process.env.REFRESH_TOKEN

  try {
  const userExists = await UserRegisterSchema.findOne({
    $or:[
      {candidateEmail:email},
      {expertOrgEmail:email}
    ]})

  if(!userExists){
    return res.status(404).json({message:"User Not Found"})
  }

  const accessToken = jwt.sign({
    name: userExists.candidateName || userExists.expertName,
    role:userExists.role
  }, Access_Token, {expiresIn:"24h"})

  const refreshToken = jwt.sign({
    name: userExists.candidateName || userExists.expertName,
    role: userExists.role
  }, Refresh_Token)

  return res.status(200).json({
    accessToken,
    refreshToken,
    name: userExists.candidateName || userExists.candidateEmail,
    email: userExists.candidateEmail || userExists.expertOrgEmail,
    role: userExists.role
  })

  } catch (error) {
    console.error("ERROR OCCURED IN LOGIN", error)
    res.status(500).json({msg:"SOMETHING WENT WRONG"})
  }
}