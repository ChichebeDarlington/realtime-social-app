import Post from "../models/Post";
import cloudinary from "cloudinary"




// // Configuration 
// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET
//   });


// Configuration 
cloudinary.config({
    cloud_name: "chebewebdev",
    api_key: "874474727642197",
    api_secret: "ce6ZpddoL5VUGYoSH7ObHZM3AJg"
  });
  

export const createPost = async(req, res)=>{
console.log(req.body)
const {content, image} = req.body;
if(!content.length){
    return res.json({err: "post can't be empty"})
}

const post = new Post({content, image, postedBy: req.auth.userId})

try {
    await post.save()
   return res.status(201).json(post)
} catch (error) {
    console.log(error);
    return res.status(400).json({err:"server down"})
}
}

export const userPosts = async (req, res)=>{
    // console.log(req.body)
try {
    const posts = await Post.find({postedBy: req.auth.userId})
    .populate("postedBy", "image _id name")
    .sort({created: -1})
    .limit(10)
    // console.log(posts);
    return res.status(201).json(posts)
} catch (error) {
    console.log(error);
}
}

export const imageUpload = async(req, res)=>{
    // console.log(req.files)
    try {
        const photo = await cloudinary.uploader.upload(req.files.image.path)
        // console.log(photo);
        return res.status(201).json({
            url: photo.secure_url,
            public_id: photo.public_id
        })
    } catch (error) {
        console.log(error);
    }
}