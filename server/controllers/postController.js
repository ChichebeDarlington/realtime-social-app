import Post from "../models/Post";
import cloudinary from "cloudinary";

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
  api_secret: "ce6ZpddoL5VUGYoSH7ObHZM3AJg",
});

export const createPost = async (req, res) => {
  // console.log(req.body);
  const { content, image } = req.body;
  if (!content.length) {
    return res.json({ err: "post can't be empty" });
  }

  const post = new Post({ content, image, postedBy: req.auth._id });

  try {
    await post.save();
    return res.status(201).json(post);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ err: "server down" });
  }
};

export const userPosts = async (req, res) => {
  // console.log(req.body)
  try {
    const posts = await Post.find({ postedBy: req.auth._id })
      .populate("postedBy", "_id name")
      .sort({ created: -1 })
      .limit(10);
    // console.log(posts);
    return res.status(201).json(posts);
  } catch (error) {
    console.log(error);
  }
};

export const imageUpload = async (req, res) => {
  // console.log(req.files)
  try {
    const photo = await cloudinary.uploader.upload(req.files.image.path);
    // console.log(photo);
    return res.status(201).json({
      url: photo.secure_url,
      public_id: photo.public_id,
    });
  } catch (error) {
    console.log(error);
  }
};

export const editPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    console.log(post);
    res.json(post);
  } catch (error) {
    console.log(error);
  }
};

export const postUpdate = async (req, res) => {
  const { postId } = req.params;
  try {
    const postUpdate = await Post.findByIdAndUpdate(postId, req.body, {
      new: true,
    });

    // remove current image from the cloudinary
    if (deletePost.image && deletePost.image.public_id) {
      const image = await cloudinary.uploader.destroy(
        deletePost.image.public_id
      );
    }
    // console.log("update", postUpdate);
    res.status(200).json(postUpdate);
  } catch (error) {
    console.log(error);
  }
};

export const postDelete = async (req, res) => {
  const { postId } = req.params;
  try {
    const deletePost = await Post.findByIdAndDelete(postId);
    if (deletePost.image && deletePost.image.public_id) {
      const image = await cloudinary.uploader.destroy(
        deletePost.image.public_id
      );
    }
    res.status(200).json({ ok: true });
  } catch (error) {
    console.log(error);
  }
};
