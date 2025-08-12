
import express from 'express'
import {placeOrder,placeOrderStripe,placeOrderRazorpay,allOrders,userOrders,updateStatus} from '../controllers/orderController.js' 
import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js'
const orderRouter=express.Router()

// admin features
orderRoute.post('/list',adminAuth,allOrders)
orderRoute.post('/status',adminAuth,updateStatus)

// payment features
orderRoute.post('/place',authUser,placeOrder)
orderRoute.post('/place',authUser,placeOrderStripe)
orderRoute.post('/place',authUser,placeOrderRazorpay)

// user feartures
orderRoute.post('/userorders',authUser,userOrders)

// 10:49:15
export default orderRouter;