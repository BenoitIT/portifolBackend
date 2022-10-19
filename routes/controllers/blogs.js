const Blog = require("./../models/blog");
const { asyncWrapper } = require("../middleware/tryCatch");
const { findByIdAndRemove, findOne } = require("../models/messages");
//function to create new blog
const addBlog = asyncWrapper(async (req, res) => {
  const { blogTitle, blogDescription } = req.body;
  const newBlog = await Blog.create({
    blogTitle: blogTitle,
    blogDescription: blogDescription,
    blogImg: req.file.filename,
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
  await findByIdAndRemove({ _id: id });
  res.status(200).json({ message: "delete successiful" });
});
const viewSingleBlog = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const blog = await findOne({ id });
  res.status(200).json({ data: blog });
});
module.exports = { addBlog, listBlogs, deleteBlog,viewSingleBlog };
