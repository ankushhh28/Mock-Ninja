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