import jwt from "jsonwebtoken"

export const verifyExpertToken = async(req, res, next) => {
  const token = req.header("Authorization")
  const role = req.body.role || req.query.role

  if(!token){
    return res.status(401).json({message:"Access Denied! No tooken Provided"})
  }

  try {
    const verified = jwt.verify(token.replace("Bearer", ""), process.env.ACCESS_TOKEN)
    req.user = verified

    if(role != "Expert"){
      return res.status(403).json({ message: "Forbidden! Access restricted to Experts only" });
    }

    next()
  } catch (error) {
    return res.status(400).json({ message: "Invalid Token" });
  }
}