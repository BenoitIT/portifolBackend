const express = require("express")
const Router = express.Router()
const {auth}= require('./middleware/authMiddleware')
const{getAll, readOne,createMessage,deleteMes} =require('./controllers/tasks')
const {createUser,login}=require('./authControllers/auth')
Router.route("/").get((req, res) => {
  res.json("welcome");
});
Router.route("/message").get(auth,getAll).post(createMessage)
Router.route("/messages/:id").get(readOne).delete(deleteMes)
Router.route("/register").post(createUser)
Router.route("/login").post(login)
module.exports = Router;
