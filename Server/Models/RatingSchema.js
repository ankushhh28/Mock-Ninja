import mongoose from "mongoose";

const ratingschema = new mongoose.Schema({
  email:{
    type: String
  },
  rating:{
    type:Number
  },
  comment:{
    type:String
  },
  mockID:{
    type:String
  }
},{
  timestamps:true
})

const RatingSchema = mongoose.model("ratings", ratingschema, "ratings")
export default RatingSchema;