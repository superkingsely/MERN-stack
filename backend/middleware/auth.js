// to convert user token to id
// import jwt from 'jsonwebtoken'

// const authUser=async(req,res,next)=>{
//     const {token} =req.headers;
//     if(!token){
//         return res.json({success:false,message:'Not authorize login again'})
//     }
//     try {
//         const token_decode=jwt.verify(token,process.env.JWT_SECRET)
//         req.body.userId=token_decode.id
//         next()
//     } catch (error) {
//         console.log(error)
//         res.json({success:false,message:error.message})
//     }
// }

// export default authUser;


import jwt from 'jsonwebtoken';

const authUser = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorized, login again' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id }; // safer than modifying req.body
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Invalid token' });
  }
};

export default authUser;
