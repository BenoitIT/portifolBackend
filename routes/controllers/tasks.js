const Messages = require("../models/messages");
const{asyncWrapper}=require("../middleware/tryCatch")
const getAll = async (req, res) => {
  const message = await Messages.find({});
  res.json({ message });
};
const createMessage = asyncWrapper(async (req, res) => {
     const message = await Messages.create({
      senderName: req.body.senderName,
      senderEmail: req.body.senderEmail,
      message: req.body.message,
    });
    res.status(201).json("message sent");
})
const readOne = asyncWrapper(async (req, res) => {
  const {_id}= req.params;
    const message = await Messages.findOne({ _id }).lean();
    if(message){
      res.json({ message })
    }
    return res.status(402).json({msg:`no id found`})
 })
const deleteMes=asyncWrapper(async(req,res)=>{
  const {_id}= req.params;
    await Messages.findByIdAndDelete({_id})
    res.json("message is removed")
  }
  )

const updateOne = (req, res) => {
  res.json("update home bennods");
};
module.exports = { getAll, updateOne, readOne, createMessage, deleteMes };
