import multer from 'multer';

// Set up multer for memory storage
const storage = multer.diskStorage({
    filename:function(req,file,callback){
        callback(null,file.originalname)
    }
})

const upload = multer({storage})

// Middleware to handle image uploads
export default upload