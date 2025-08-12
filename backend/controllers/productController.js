import { v2 as cloudinary } from "cloudinary"
import { json } from "express"
import productModel from "../model/productModel.js"


const addProduct=async(req,res)=>{
    try{
        const {name,description,price,category, subCategory,size,bestSeller}=req.body

        const image1=req.files.image1 && req.files.image1[0]         
        const image2=req.files.image2 && req.files.image2[0]         
        const image3=req.files.image3 && req.files.image3[0]         
        const image4=req.files.image4 && req.files.image4[0]         

        const images=[image1,image2,image3,image4].filter((image)=>image!==undefined)

        let imagesurl=await Promise.all(
            images.map(async(image)=>{
                let result=await cloudinary.uploader.upload(image.path,{
                    resource_type:'image',
                    upload_preset: 'ecommerce'
                });
                return result.secure_url
            })
        )

        // to save to data base
        const productData={
            name,
            description,
            category,
            price:Number(price),
            subCategory,
            bestSeller:bestSeller==='true'?true:false,
            size:JSON.parse(size),
            image:imagesurl,
            date:Date.now()
        }
        const product= new productModel(productData)
        await product.save()

        console.log(name,description,price,category,subCategory, size,bestSeller)
        console.log('okay',images,imagesurl,'request.file ooh')
        res.json({
            success:true,
            message:"product added"
        }) 
    }catch(error){
        console.log(error)
        res.json({
            success:false,
            message:error.message  
        })
    }
}
// vid 7:00:00
const listProducts=async(req,res)=>{
    try {
        const products=await productModel.find({})
        res.json({
            success:true,products
        })
    } catch (error) {
        console.log(error)
        res.json({
            success:false,
            message:error.message 
        })
    }
}
const singleProduct=async(req,res)=>{
    try {
        const {productId}=req.body
        const product = await productModel.findById(productId)
        res.json({
            success:true,
            product
        })
    } catch (error) {
         console.log(error)
        res.json({
            success:false,
            message:error.message 
        })
    }
}
const removeProduct=async(req,res)=>{
    try {
        await productModel.findByIdAndDelete(req.body.id)
         res.json({
            success:true,message:'product removed'
        })
    } catch (error) {
        console.log(error)
        res.json({
            success:false,
            message:error.message 
        })
    }
}

export {addProduct,listProducts,singleProduct,removeProduct }