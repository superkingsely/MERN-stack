import mongoose from "mongoose";
// watch the typeCase of ur props
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    lowercase:true
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: Array,
    required: true,
  },
  category:{
    type:String,
    required:true
  },
  subCategory:{
    type:String,
    required:true
  },
  size:{
    type:Array, 
    required:true
  },
  bestSeller:{
    type:Boolean,
  },
  date:{
    type:Number,
    required:true
  },
}, {
//   timestamps: true, // adds createdAt and updatedAt
//   minimize:false //empty {} not remove
})


const productModel= mongoose.models.product|| mongoose.model('Product',productSchema)
export default productModel;