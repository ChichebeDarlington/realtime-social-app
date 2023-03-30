import mongoose from 'mongoose'

const {Schema} = mongoose;
const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please provide name'],
    // minlength: 3,
    // maxlength: 20,
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide password'],
  },
  // forgotPassword: {
  //   type: String,
  //   required: [true, 'password not match'],
  //   minlength: 6,
  // },
  about:{},
  photo:String,
  following:[{type:Schema.ObjectId, ref:"User"}],
  followers:[{type:Schema.ObjectId, ref:"User"}]
}, {timestamps:true})
  
export default mongoose.model('User', UserSchema)
