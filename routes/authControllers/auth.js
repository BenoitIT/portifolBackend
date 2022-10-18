const User = require("../models/user");
const Bcrypt = require("bcrypt");
const loadash = require("lodash");
const JWT = require("jsonwebtoken");
require("dotenv").config();
const { asyncWrapper } = require("../middleware/tryCatch");

const createUser = asyncWrapper(async (req, res) => {
  const salt = await Bcrypt.genSalt(10);
  const hashedPassword = await Bcrypt.hash(req.body.password, salt);
  const { names, email } = req.body;
  if (!names) {
    res.json({ msg: `name field is empty` });
  }
  if (!email) {
    res.json({ msg: `email field is empty` });
  } else {
    const user = await User.create({
      names,
      email,
      password: hashedPassword,
    });
    res.json(loadash.pick(user, ["names", "email"]));
  }
});

const login = asyncWrapper(async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  if (!email || !password) {
    res.json({ message: "enter email and password" });
  }
  const user = await User.findOne({ email }).lean();
  if (user) {
    const checkedpassword = await Bcrypt.compare(password, user.password);
    if (checkedpassword) {
      const token = JWT.sign(
        { _id: user._id, email: user.email },
        process.env.APP_SECRET,
        { expiresIn: "2d" }
      );
      res.header("x-auth-token", token);
      res.json({ message: "welcome"});
    }
  }
  res.json({ message: "incorrect username and password" });
});
module.exports = { createUser, login };
