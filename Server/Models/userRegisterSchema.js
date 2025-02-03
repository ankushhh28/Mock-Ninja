import mongoose from "mongoose";

const useregisterschema = mongoose.Schema({
  candidateName:{
    type:String
  },
  candidateEmail:{
    type:String
  },
  candidatePassword:{
    type:String
  },
  expertName:{
    type:String
  },
  expertOrgEmail:{
    type:String
  },
  expertPassword:{
    type:String
  },
  role:{
    type:String
  },
  candidatePicture:{
    type:String
  },
  expertPicture:{
    type:String
  },
}) 

const UserRegisterSchema = mongoose.model("userdetails", useregisterschema)
export default UserRegisterSchema;