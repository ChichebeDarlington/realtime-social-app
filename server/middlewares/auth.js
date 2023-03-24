import User from "../models/User";
import jwt from "jsonwebtoken"


export const verifyUser = async(req, res, next)=>{

  const {authorization} = req.headers
  if(!authorization){
       return res.status(403).json({err:"not authenticated"})
  }

  const token = authorization.split(" ")[1]

 try {
  jwt.verify(token, process.env.JWT_SECRET, async(err, data)=>{
    // console.log(data);
    if(err){
      return res.sendStatus(403)
    }
  //  return res.json({data})
  return req.auth = data
  })
  next()
 } catch (error) {
  console.log(error);
  res.status(401).json({err: "Request not authorized"})
 }
}