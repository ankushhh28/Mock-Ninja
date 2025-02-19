import mongoose from "mongoose"

const resumepackageschema = new mongoose.Schema({
  email:{
    type:String
  },
  Title:{
    type:String
  },
  Time:{
    type:String
  },
  Price:{
    type:String
  },
  Description:{
    type:String
  },
},{
  timestamps:true
})

const ResumePackageSchema = mongoose.model("resumepackagedetails", resumepackageschema)
export default ResumePackageSchema