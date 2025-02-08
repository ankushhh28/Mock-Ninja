import QuesGenSchema from "../../Models/QuesGenSchema.js"

// ----------------- SAVING DATA TO THE DATABASE ---------------------

export const GeneratedQuesStore = async(req, res) => {
  const {candidateEmail, mockID, questions} = req.body

  try {
    const QuesData = await QuesGenSchema.findOne({mockID})
    if(QuesData){
      return res.status(400).json({message:"Interview Failed! Try again later"})
    }

    const Ques = new QuesGenSchema({
      email:candidateEmail,
      mockID,
      questions
    })

    await Ques.save()
    return res.status(200).json(mockID)
  } catch (error) {
    console.log(error)
    return res.status(500).json({message:"Error while Conducting Interview! Try Later"})
  }
}


// ----------------- FETCHING QUESTIONS FROM BACKEND ---------------------

export const fetchingQues = async(req, res)  => {
  const {email, mockID} = req.query

  try {
    const ques = await QuesGenSchema.findOne({email, mockID})
    if(!ques){
      return res.status(404).json({message:"No interview questions were found!"})
    }
    return res.status(200).json(ques)
  } catch (error) {
    return res.status(500).json({message:"Error while Conducting Interview! Try Later"})
  }
}