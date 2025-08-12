import jwt from 'jsonwebtoken'
const adminAuth=async(req,res,next)=>{
    try {
        const {token}=req.headers
        if(!token){
            return res.json({
                success:false,
                message:'Pls login as an admin'
            })
        }
        const token_decode=jwt.verify(token,process.env.JWT_SECRET);
        if(token_decode!==process.env.ADMIN_EMAIL+process.env.ADMIN_PASSWORD){
            return res.json({
                success:false,
                message:'not auht login 2'
            })
        }
        next()
    } catch (error) {
        console.log(error.message);
        
        res.json({
            success:false,
            message:error.message 
        })
    }
}

export default adminAuth;