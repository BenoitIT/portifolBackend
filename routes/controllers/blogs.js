const Blog = require("./../models/blog");
const { asyncWrapper } = require("../middleware/tryCatch");
const {uploads} =require("../connections/cloudinary")
//function to create new blog
const addBlog = asyncWrapper(async (req, res) => {
  const { blogTitle, blogDescription } = req.body;
  //finding cloudinary path
  const uploader=async(path)=>await uploads(path,'blogImg')
  const actualPath=req.file.path
  //initializing cloudinary path
  const newPath= await uploader(actualPath)
  const newBlog = await Blog.create({
    blogTitle: blogTitle,
    blogDescription: blogDescription,
    blogImg:newPath.url
    //blogImg: req.file.filename,
  });
  res.status(201).json({ message: "new blog added" });
});
//listing blogs
const listBlogs = asyncWrapper(async (req, res) => {
  const blogs = await Blog.find({});
  res.status(200).json({ message: "new blog added", blogsList: blogs });
});
//delete blog
const deleteBlog = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  await Blog.findByIdAndRemove({ _id: id });
  res.status(200).json({ message: "delete successiful" });
});
const viewSingleBlog = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const blog = await Blog.findOne({ id });
  res.status(200).json({ data: blog });
});
module.exports = { addBlog, listBlogs, deleteBlog,viewSingleBlog };
