import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    lowercase:true
  },
  email: {
    type: String,
    required: true,
    unique: true, // email must be unique
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    // minlength: 6
  },
  cartData:{
    type:Object,
    default:{}
  }
}, {
  timestamps: true, // adds createdAt and updatedAt
  minimize:false //empty {} not remove
})


const userModel= mongoose.models.user || mongoose.model('User',userSchema)
export default userModel; 