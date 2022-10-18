const Blog = require("./../models/blog");
const { asyncWrapper } = require("../middleware/tryCatch");
const multer = require("multer");
const storage = multer.diskStorage({
    destination:function(req,file,callBack){
      callBack(null,'/uploads')
    },
    filename:function(req,file,callback){
     callback(null,new Date().toISOString()+file.originalname)
    }
});
const fileFilter = (req,file,callback)=>{
    if(file.mimeType==="image/jpg"||file.mimeType==="image/png"){
        callback(null,true)
    }
    else{
        callback(null,false)
    }
}
//multer image upload
const upload=multer({storage:storage},fileFilter)

//function to create new blog
const addBlog = asyncWrapper(async (req, res) => {
  const { blogTitle, blogDescription } = req.body;
  Blog.create({
    blogTitle,
    blogDescription,
    blogImg:req.file.path
  });
  res.status(201).json({ message: "new blog added" });
});
module.exports = { addBlog };
