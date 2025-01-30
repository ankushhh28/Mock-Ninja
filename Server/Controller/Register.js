import UserRegisterSchema from "../Models/userRegisterSchema.js"
import bcrypt from "bcryptjs"

// --------------------- CANDIDATE REGISTRATION ---------------------------------

export const candidateRegister = async(req, res) => {

  const {candidateEmail, candidatePassword, ...otherDetails} = req.body

  try {

    const emailExist = await UserRegisterSchema.finnOne({candidateEmail})
    if(emailExist){
      return res.status(400).json({message:"Email already exists"})
    }

    const hashedPassword = await bcrypt.hash(candidatePassword, 10)

    const newUser = new UserRegisterSchema({
      candidateEmail,
      candidatePassword: hashedPassword,
      ...otherDetails
    })

    await newUser.save()
    res.status(200).json({message:"Successfully Registered"})
  } catch (error) {
    console.error("Error while saving userRegister Details", error)
    return res.status(500).json({message:"Error while Registering Candidate Details"})
  }
}

// --------------------- INTERVIEWER REGISTRATION ---------------------------------