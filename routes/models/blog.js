const mongoose=require("mongoose");
const Schema= mongoose.Schema;
const blogSchema= new Schema({
    blogTitle:{
        type:String,
        maxLength:50
    },
    blogDescription:{
        type:String,
        maxLength:300
    },
    blogImg:{
        type:String
    }
})
module.exports=mongoose.model("Blog",blogSchema)

