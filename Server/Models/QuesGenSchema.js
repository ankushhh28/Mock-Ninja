import mongoose from "mongoose"

const quesschema = new mongoose.Schema({
  email:{
    type: String
  },
  mockID:{
    type:String
  },
  questions:{
    type:String
  },
  details:{
    type:String
  }
},{
  timestamps:true
})

const QuesGenSchema = mongoose.model("quesgenerated", quesschema)
export default QuesGenSchema;