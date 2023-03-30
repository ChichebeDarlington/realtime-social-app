import mongoose from 'mongoose'

const {Schema} = mongoose;
// console.log(Schema);
const postSchema = new Schema({
  content: {
    type: String,
    required: [true, 'Please provide name'],
  },
  postedBy:{
    type: Schema.ObjectId,
    ref: "User"
  },
  photo:String,
  likes:[{type:Schema.ObjectId, ref:"User"}],
  comments:[{type:Schema.ObjectId, ref:"User"}],
  text:{
    type: String
  },
  created:{
    type: Date, default: Date.now
  },
  image:{
    url: String,
    public_id: String
  }
}, {timestamps:true})
  
export default mongoose.model('Post', postSchema)
