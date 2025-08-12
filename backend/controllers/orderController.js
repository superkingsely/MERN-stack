

import orderModel from "../model/orderModel"
import userModel from "../model/userModel"
// place order cash on de
const placeOrder=async(req,res)=>{
    try {
        const {userId,amount,address,items}=req.body
        const orderData={
            userId,
            items,
            amount,
            paymentMethod:'COD',
            payment:false,
            date:Date.now()
        }
        const newOrder=new orderModel(orderData)
        await newOrder.save()
        // 10:54:55
        await userModel.findByIdAndUpdate(userId,{cartData:{}} )
        res.json({success:true,message:'order placed'})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}
// place order stripe
const placeOrderStripe=async(req,res)=>{

}
// place order razorpay
const placeOrderRazorpay=async(req,res)=>{

}
// all orders data for admin panel
const allOrders =async(req,res)=>{

}
// user order data for frontend
const userOrders=async(req,res)=>{

}
// update order status from admin
const updateStatus=async(req,res)=>{

}

export {placeOrder,placeOrderStripe,placeOrderRazorpay,allOrders,userOrders,updateStatus}