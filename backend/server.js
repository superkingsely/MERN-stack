// backend start and depend is vid 5:13:07
import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import userRouter from './routes/userRouters.js'
import connectDB from './config/db.js'
import connectCloudinary from './config/cloudinary.js'
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'

// app config

const app=express()
const port=process.env.PORT 

connectDB()   
connectCloudinary() 

// middleware

app.use(express.json())
app.use(cors())
// ap1 endpoint
 
app.use('/api/user',userRouter)
app.use('/api/products',productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)

app.get('/',(req,res)=>{
    res.send('API working...')
})

// Handle 404
app.use((req, res, next) => {
  res.status(404).json({
    message: 'Route not found',
    path: req.originalUrl
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('seen1',err.stack,'seen2');
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error'
  });
});

app.listen(port,()=>{
    return console.log(`server started at port ${port} err0r = `);
    
})