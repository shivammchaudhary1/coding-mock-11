const express = require(`express`);
const userProfile = express.Router();
const { userModel } = require("../models/user.modal");

userProfile.get("/profile", async (req, res) => {
  const { userID } = req.body;

  try {
    const user = await userModel.findOne({ _id: userID });
    res.status(200).send({ user: { name: user.name, email: user.email } });
  } catch (error) {
    res.status(400).send({ msg: error });
  }

  res.send(userID);
});

module.exports = { userProfile };
