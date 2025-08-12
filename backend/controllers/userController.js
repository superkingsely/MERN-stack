import userModel from "../model/userModel.js"
import validator from 'validator'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
const createToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}
const loginUser = async (req,res)=>{
    try{

        const {email,password}=req.body

        const user=await userModel.findOne({email})
        if(!user){
            return res.json({success:false,message:'user dont exit pls sign up'})
        }
        const isMatch=await bcrypt.compare(password,user.password)
        if(!isMatch){
             return res.json({success:false,message:'in coorect password'})
        }
        const token=createToken(user._id)
        res.json({success:true,message:'login succeful',token})

    }catch(error){
         console.log(error)
        res.json({
            success:false,
            message:error.message 
        })
    }

}
const registerUser=async(req,res)=>{
    // res.send('hmmm')
    // res.json({msg:"Api working"})
    try{
        const {name,email,password}=req.body
        // console.log(name)
        // res.json(name)
        const exits= await userModel.findOne({email})
        if(exits){
            return res.json({
                success:false,
                message:'useralready exist'
            })
        }
        // validating
        if(!validator.isEmail(email)){
             return res.json({
                success:false,
                message:'pls enter a valid mail'
            })
        } 

        const hashedPassword = await bcrypt.hash(password, 6);

        const newUser=new userModel({
            name,
            email,
            password:hashedPassword
        })

        const user = await newUser.save()
        const token =createToken(user._id)
        res.json({
            success:true,
            token,
        })

    }catch(error){ 
        console.log(error)
        res.json({
            success:false,
            message:error.message 
        })
    }
}

const adminLogin=async(req,res)=>{
    try {
        const {email,password}=req.body
        console.log(email,password)
        if(email===process.env.ADMIN_EMAIL&&password===process.env.ADMIN_PASSWORD){
            const token=jwt.sign(email+password,process.env.JWT_SECRET)
            res.json({
                success:true,
                token
            })
        }else{
            res.json({
            success:false,
            message:'invalid credentials'
        })
        }
    } catch (error) {
         console.log(error)
        res.json({
            success:false,
            message:error.message 
        })
    }
}

export { loginUser, registerUser,adminLogin}