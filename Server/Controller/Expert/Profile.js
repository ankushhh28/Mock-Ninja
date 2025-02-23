import UserRegisterSchema from "../../Models/userRegisterSchema.js"

// ------------- UPDATING PROFILE ------------------

export const UpdatingProfile = async(req, res) => {
  const {expertPersonalEmail} = req.body

  try {
    const user = await UserRegisterSchema.findOne({expertPersonalEmail})

    user.expertDOB = req.body.expertDOB
    user.expertName = req.body.expertName
    user.expertOrgEmail = req.body.expertOrgEmail
    user.expertPersonalEmail = req.body.expertPersonalEmail
    user.expertExperience = req.body.expertExperience
    user.expertPhoneNumber = req.body.expertPhoneNumber
    user.expertGender = req.body.expertGender
    user.expertAddress = req.body.expertAddress
    user.expertLinkedin = req.body.expertLinkedin
    user.expertYoutube = req.body.expertYoutube
    user.expertInstagram = req.body.expertInstagram
    user.expertCurrentCompany = req.body.expertCurrentCompany
    user.expertBio = req.body.expertBio
    user.expertAbout = req.body.expertAbout
    user.expertIndAccountNumber = req.body.expertIndAccountNumber
    user.expertIndAccountHolderName = req.body.expertIndAccountHolderName
    user.expertIndIfscCode = req.body.expertIndIfscCode
    user.expertIndBranchName = req.body.expertIndBranchName
    user.expertIndUPI = req.body.expertIndUPI
    user.expertOUTaccountNumber = req.body.expertOUTaccountNumber
    user.expertOUTaccountHolderName = req.body.expertOUTaccountHolderName
    user.expertOUTianNumber = req.body.expertOUTianNumber
    user.expertOUTswiftCode = req.body.expertOUTswiftCode

    await user.save()
    return res.status(200).json({message:"Profile Updated Successfully"})
  } catch (error) {
    return res.status(200).json({message:"Something Went Wrong! Try Again Later."})
  }
}

// ------------- FETCHING PROFILE DATA -----------------

export const FetchingProfileData = async(req, res) => {

  const {email} = req.query

  try {

    const userData = await UserRegisterSchema.findOne({expertPersonalEmail:email})

    return res.status(200).json(userData)
  } catch (error) {
    return res.status(200).json({message:"Something Went Wrong! Try Again Later."})
  }
}

// ------------- UPLOADING IMAGE -----------------------

export const UploadingImage = async(req, res) => {
  const {email, img} = req.body


  try {
    const user = await UserRegisterSchema.findOne({expertPersonalEmail:email})

    user.expertProfilePhoto = img
    await user.save()
    return  res.status(200).json({message:"Profile Image Change Successfully"})
  } catch (error) {
    return  res.status(500).json({message:"Error while changing Profile Image"})
  }
}