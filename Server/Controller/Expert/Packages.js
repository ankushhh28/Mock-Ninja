import InterviewPackageSchema from "../../Models/PackageDetails/InterviewPackageSchema.js"
import CarrierPackageSchema from "../../Models/PackageDetails/CarrierPackageSchema.js"
import ResumePackageSchema from "../../Models/PackageDetails/ResumePackageSchema.js"
import PriorityPackageSchema from "../../Models/PackageDetails/PriorityPackageSchema.js"

// ---------------- FETCHING INTERVIEW PACKAGE DETAILS ------------------

export const fetchingInterviewPackage = async(req, res) => {
  const {email} = req.query

  try {
    const intData = await InterviewPackageSchema.findOne({email})

    return res.status(200).json(intData)
  } catch (error) {
    return res.status(500).json({message:'Something Went Wrong! Try Again Later.'})
  }
}

// -------------- UPDATING INTERVIEW PACKAGE DETAILS -------------------

export const updatingInterviewPackage = async(req, res) => {

  const {email} = req.body

  try {
    const updateData = await InterviewPackageSchema.findOne({email})
    if(!updateData){
      const newData = new InterviewPackageSchema(req.body)
      await newData.save()
      return res.status(200).json({message:"Interview Package Updated Successfully"})
    }
    
    updateData.email = req.body.email
    updateData.Title = req.body.Title
    updateData.Time = req.body.Time
    updateData.Price = req.body.Price
    updateData.Description = req.body.Description
    await updateData.save()
    return res.status(200).json({message:"Interview Package Updated Successfully"})

  } catch (error) {
    return res.status(500).json({message:"Something Went Wrong! Try Later"})
  }
}

// ---------------- FETCHING CAREER PACKAGE DETAILS ------------------

export const fetchingCareerPackage = async(req, res) => {
  const {email} = req.query

  try {
    const careerData = await CarrierPackageSchema.findOne({email})

    return res.status(200).json(careerData)
  } catch (error) {
    return res.status(500).json({message:'Something Went Wrong! Try Again Later.'})
  }
}

// -------------- UPDATING CAREER PACKAGE DETAILS -------------------

export const updatingCareerPackage = async(req, res) => {

  const {email} = req.body

  try {
    const updateData = await CarrierPackageSchema.findOne({email})
    if(!updateData){
      const newData = new CarrierPackageSchema(req.body)
      await newData.save()
      return res.status(200).json({message:"Career Package Updated Successfully"})
    }
    
    updateData.email = req.body.email
    updateData.Title = req.body.Title
    updateData.Time = req.body.Time
    updateData.Price = req.body.Price
    updateData.Description = req.body.Description
    await updateData.save()
    return res.status(200).json({message:"Career Package Updated Successfully"})

  } catch (error) {
    return res.status(500).json({message:"Something Went Wrong! Try Later"})
  }
}

// ---------------- FETCHING RESUME PACKAGE DETAILS ------------------

export const fetchingResumePackage = async(req, res) => {
  const {email} = req.query

  try {
    const resumeData = await ResumePackageSchema.findOne({email})

    return res.status(200).json(resumeData)
  } catch (error) {
    return res.status(500).json({message:'Something Went Wrong! Try Again Later.'})
  }
}

// -------------- UPDATING RESUME PACKAGE DETAILS -------------------

export const updatingResumePackage = async(req, res) => {

  const {email} = req.body

  try {
    const updateData = await ResumePackageSchema.findOne({email})
    if(!updateData){
      const newData = new ResumePackageSchema(req.body)
      await newData.save()
      return res.status(200).json({message:"Resume Package Updated Successfully"})
    }
    
    updateData.email = req.body.email
    updateData.Title = req.body.Title
    updateData.Time = req.body.Time
    updateData.Price = req.body.Price
    updateData.Description = req.body.Description
    await updateData.save()
    return res.status(200).json({message:"Resume Package Updated Successfully"})

  } catch (error) {
    return res.status(500).json({message:"Something Went Wrong! Try Later"})
  }
}

// ---------------- FETCHING PRIORITY DM PACKAGE DETAILS ------------------

export const fetchingPriorityDMPackage = async(req, res) => {
  const {email} = req.query

  try {
    const resumeData = await PriorityPackageSchema.findOne({email})

    return res.status(200).json(resumeData)
  } catch (error) {
    return res.status(500).json({message:'Something Went Wrong! Try Again Later.'})
  }
}

// -------------- UPDATING PRIORITY DM PACKAGE DETAILS -------------------

export const updatingPriorityDMPackage = async(req, res) => {

  const {email} = req.body

  try {
    const updateData = await PriorityPackageSchema.findOne({email})
    if(!updateData){
      const newData = new PriorityPackageSchema(req.body)
      await newData.save()
      return res.status(200).json({message:"Priority DM Package Updated Successfully"})
    }
    
    updateData.email = req.body.email
    updateData.Title = req.body.Title
    updateData.Time = req.body.Time
    updateData.Price = req.body.Price
    updateData.Description = req.body.Description
    await updateData.save()
    return res.status(200).json({message:"Priority DM Package Updated Successfully"})

  } catch (error) {
    return res.status(500).json({message:"Something Went Wrong! Try Later"})
  }
}