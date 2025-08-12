import multer from "multer";

// 6:31:30
const storage=multer.diskStorage({
    filename:(req,file,callback)=>{
        callback(null,file.originalname)
    }
})

const upload=multer({storage})

export default upload