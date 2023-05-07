import jsonWebToken from "jsonwebtoken";
import Post from "../models/Post.js";
import User from "../models/User.js";

export const verifyUserToUpdateOrDeletePost = async (req, res, next) => {
  const userVerify = await Post.findById(req.params._id);
  if (req.user.userId != userVerify.postedBy) {
    res.status(400).json({ error: "Unauthorized" });
  }
  next();
};

export const verifyUser = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Token authorization is required" });
  }

  const token = authorization.split(" ")[1];

  try {
    const { userId } = jsonWebToken.verify(token, process.env.JWT_SECRET);

    req.auth = await User.findOne({ _id: userId });

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Unauthorized resquest" });
  }
};

// import User from "../models/User";
// import jwt from "jsonwebtoken"

// export const verifyUser = async(req, res, next)=>{

//   const {authorization} = req.headers
//   if(!authorization){
//        return res.status(403).json({err:"not authenticated"})
//   }

//   const token = authorization.split(" ")[1]

//  try {
//      jwt.verify(token, process.env.JWT_SECRET, async(err, data)=>{
//     // console.log(data);
//     if(err){
//       return res.sendStatus(403)
//     }
//   //  return res.json({data})
//   return req.auth = data
//   })
//   next()
//  } catch (error) {
//   console.log(error);
//   res.status(401).json({err: "Request not authorized"})
//  }
// }
