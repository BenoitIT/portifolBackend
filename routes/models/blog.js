const mongoose=require("mongoose");
const Schema= mongoose.Schema;
require('mongoose-type-url');
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
        type:mongoose.SchemaTypes.Url}
   }
   )
module.exports=mongoose.model("Blog",blogSchema)

