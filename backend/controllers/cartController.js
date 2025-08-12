import userModel from "../model/userModel.js"

// 10:00:00
const addToCart=async(req,res)=>{
    try {
        
        // const {userId,itemId,size}=req.body
    const { itemId, size } = req.body;
    const userId = req.user.id; 
    // console.log(userId,'userid')
        const userData=await userModel.findById(userId)
        let cartData=await userData.cartData;

        if(cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[itemId][size]+=1
            }else{
                cartData[itemId][size]=1
            }
        }else{
            cartData[itemId]={}
            cartData[itemId][size]=1
        }
        // save cart to db
        await userModel.findByIdAndUpdate(userId,{cartData})
        res.json({success:true,message:'we have added to cart'})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }

}

const updateCart=async(req,res)=>{
    try {
         const {userId,itemId,size,quantity}=req.body
    
        const userData=await userModel.findById(userId)
        let cartData=await userData.cartData;

        cartData[itemId][size]=quantity;
        // save cart to db
        await userModel.findByIdAndUpdate(userId,{cartData})
        res.json({success:true,message:'cart updated '})
    } catch (error) {
         console.log(error)
        res.json({success:false,message:error.message})
    }
}

const getUserCart=async(req,res)=>{
    try {
        // console.log(req,'req ')
        const userId=req.user.id
        // console.log(userId);
        
        const userData=await userModel.findById(userId)
        // console.log(userData);
        
        let cartData=await userData.cartData;

        res.json({success:true,cartData})
    } catch (error) {
         console.log(error)
        res.json({success:false,message:error.message})
    }
}

export{addToCart,updateCart,getUserCart}