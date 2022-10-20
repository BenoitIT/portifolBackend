const express = require("express")
const routes = require("./routes/task")
const {notFound,errorHandler}= require('./routes/middleware/notFound')
const app = express()
require('dotenv').config()
const {ConnectDb}=require('./routes/connections/dbConnect')
app.use(express.json())
app.use('/api/v1/portifolio', routes)
app.use(notFound)
//app.use(errorHandler)
const port=process.env.PORT||3000
const startApp=async()=>{
    await ConnectDb(process.env.MONGO_URL)
    app.listen(port, console.log(`application is listening to port ${port}....`))
}
startApp()
