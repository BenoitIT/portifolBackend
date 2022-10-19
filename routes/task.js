const express = require("express")
const Router = express.Router()
const {auth}= require('./middleware/authMiddleware')
const{getAll, readOne,createMessage,deleteMes} =require('./controllers/tasks')
const {createUser,login}=require('./authControllers/auth')
const {addBlog,listBlogs,deleteBlog,viewSingleBlog}=require("./controllers/blogs")
const {upload}=require("./controllers/image")
//messages routes
Router.route("/message").get(auth,getAll).post(createMessage)
Router.route("/message/:id").get(readOne).delete(deleteMes)
//authentication routes
Router.route("/register").post(createUser)
Router.route("/login").post(login)
//blogs routes
Router.route("/blogs").post(upload.single('blogImg'),addBlog).get(listBlogs)
Router.route("/blog/:id").delete(deleteBlog).get(viewSingleBlog)
module.exports = Router;
