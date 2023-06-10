const express = require(`express`);
const userRouter = express.Router(); // create route
const { userModel } = require("../models/user.modal"); //model
const bcrypt = require("bcrypt"); //hashing
var jwt = require("jsonwebtoken"); //for generating token

userRouter.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  try {
    bcrypt.hash(password, 2, async function (err, hash) {
      // Store hash in your password DB.
      const newUser = new userModel({ name, email, password: hash });
      await newUser.save();
      res.status(200).send("Registration Successfull");
    });
  } catch (error) {
    res.status(400).send({ msg: error.error });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });

    bcrypt.compare(password, user.password, function (err, result) {
      // result == true
      if (result) {
        //generating token
        var token = jwt.sign(
          { userID: user._id, userName: user.name, userEmail: user.email },
          "masai"
        );

        res.status(200).send({ msg: "Login Successfull", token });
      } else {
        res.status(200).send("Wrong Credentials");
      }
    });
  } catch (error) {
    res.status(400).send({ msg: error });
  }
});

module.exports = { userRouter };
