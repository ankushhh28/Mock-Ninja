import mongoose from "mongoose"

const carrierpackageschema = new mongoose.Schema({
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

const CarrierPackageSchema = mongoose.model("carrierpackagedetails", carrierpackageschema)
export default CarrierPackageSchema