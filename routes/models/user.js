const mongoose = require('mongoose')
const Schema = mongoose.Schema
const userSChema = new Schema({
  names: String,
  email: {
    unique: [true, "this email is arleady exist"],
    type: String,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address"
    ],
    required: true
  },
  password:{
    type:String,
    required:[true,'password should not be empty'],
    trim:true,
    minLength:6
}


});
module.exports = mongoose.model("User", userSChema);
