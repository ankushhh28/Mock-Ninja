import mongoose from "mongoose"

const prioritypackageschema = new mongoose.Schema({
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

const PriorityPackageSchema = mongoose.model("prioritypackagedetails", prioritypackageschema)
export default PriorityPackageSchema