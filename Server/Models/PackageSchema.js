import mongoose from "mongoose"

const packageschema = new mongoose.Schema({
  email:{
    type:String
  },
  InterviewPackage:{
    type:Boolean
  },
  ResumePackage:{
    type:Boolean
  },
  CarrierPackage:{
    type:Boolean
  },
  PriorityPackage:{
    type:Boolean
  },
  Availability: {
    Monday: [{ type: String }],   
    Tuesday: [{ type: String }],
    Wednesday: [{ type: String }],
    Thursday: [{ type: String }],
    Friday: [{ type: String }],
    Saturday: [{ type: String }],
    Sunday: [{ type: String }],
  },
}
,{
  timestamps:true
})

const PackageSchema = mongoose.model("packages", packageschema)
export default PackageSchema