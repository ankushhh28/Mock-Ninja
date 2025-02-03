import jwt from "jsonwebtoken";

export const verifyCandidateToken = (req, res, next) => {
  const token = req.header("Authorization");
  const {role} = req.query

  if (!token) {
    return res.status(401).json({ message: "Access Denied! No Token Provided" });
  }

  try {
    const verified = jwt.verify(token.replace("Bearer ", ""), process.env.ACCESS_TOKEN);
    req.user = verified; 

    if (role !== "Candidate") {
      return res.status(403).json({ message: "Forbidden! Access restricted to Candidates only" });
    }

    next(); 
  } catch (error) {
    return res.status(400).json({ message: "Invalid Token" });
  }
};