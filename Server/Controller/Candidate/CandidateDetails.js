import UserRegisterSchema from "../../Models/userRegisterSchema.js"

export const fetchCandidateDetails = async(req, res) => {
  const {email} = req.query

  try {
    const candidate = await UserRegisterSchema.findOne({candidateEmail:email})
    if(!candidate){
      return res.status(404).json({message:"Mail or user does not exist"})
    }

    return res.status(200).json(candidate)
  } catch (error) {
    return res.status(500).json({message:"Error while fetching Candidate details"})
  }
}

export const updateCandidateDetails = async(req, res) => {

  const {candidateName, candidateEmail, candidatePicture, candidateNumber, candidateCollege, candidateCourse, candidateBranch, candidateCity} = req.body

  try {
    const user = await UserRegisterSchema.findOne({candidateEmail})

    user.candidateName = candidateName
    user.candidateEmail = candidateEmail
    user.candidatePicture = candidatePicture
    user.candidateNumber = candidateNumber
    user.candidateCollege = candidateCollege
    user.candidateCourse = candidateCourse
    user.candidateBranch = candidateBranch
    user.candidateCity = candidateCity

    await user.save()
    return res.status(200).json({message:"Profile Updated Successfully"})
  } catch (error) {
    console.log(error)
    return res.status(500).json({message:"Error while updating profile"})
  }
}