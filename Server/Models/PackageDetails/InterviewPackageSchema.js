import mongoose from "mongoose"

const interviewpackageschema = new mongoose.Schema({
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

const InterviewPackageSchema = mongoose.model("interviewpackagedetails", interviewpackageschema)
export default InterviewPackageSchema