import UserRegisterSchema from "../../Models/userRegisterSchema.js"
import grid from "gridfs-stream"
import mongoose from "mongoose"

let gfs,gridfsBucket
const conn = mongoose.connection;
conn.once('open', () => {
  gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "photos",
  })
  gfs = grid(conn.db, mongoose.mongo);
  gfs.collection("photos")
})

export const getImage = async (req, res) => {
  // console.log("Requested filename:", req.params.filename);
  try {
    const file = await gfs.files.findOne({ filename: req.params.filename });

    if (!file) {
      return res.status(404).json({ msg: "Image not found" });
    }

    // console.log("File found:", file);
    const readStream = gridfsBucket.openDownloadStream(file._id);
    readStream.pipe(res);
  } catch (error) {
    console.error("Error retrieving file:", error);
    return res.status(500).json({ msg: "SERVER ERROR" });
  }
};

// ------------------ AFTER UPLOAD SENDING RESPOSE TO CLIENT ------------------

export const UploadImage = (req,res) => {
  
  if(!req.file){
    return res.status(404).json({message:"Select an image to upload."})
  }

  const imageUrl = `${req.file.originalname}`

  return res.status(200).json(imageUrl)
}

// --------------------- IMAGE UPLOADING OF PARTICULAR CANDIDATE -----------------

export const CandidateImageupload = async(req, res) => {
  const {email, img} = req.body


  try {
    const user = await UserRegisterSchema.findOne({candidateEmail:email, role:"Candidate"})

    user.candidatePicture = img
    await user.save()
    return  res.status(200).json({message:"Profile Image Change Successfully"})
  } catch (error) {
    return  res.status(500).json({message:"Error while changing Profile Image"})
  }
}