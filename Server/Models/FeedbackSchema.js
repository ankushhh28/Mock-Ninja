import mongoose from "mongoose"

const feedbackschema = new mongoose.Schema({
  mockId:{
    type:String
  },
  QuestionAnswerFeedback:{
    type:String
  },
  GestureFeedback:{
    type:String
  },
  email:{
    type:String
  },
  userQuestionAnswer:{
    type:String
  },
  details:{
    type:String
  },
},{timestamps:true})

const FeedbackSchema = mongoose.model("feedback", feedbackschema)
export default FeedbackSchema