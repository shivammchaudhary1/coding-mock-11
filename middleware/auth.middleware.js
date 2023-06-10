//need to decode the jwt token

var jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  let token = req.headers.authorization;

  if (token) {
    try {
      //decode the token
      var decode = jwt.verify(token.split(" ")[1], "masai");

      if (decode) {
        console.log(decode);
        req.body.userID = decode.userID;
        req.body.userName = decode.userName;
        req.body.userEmail = decode.userEmail;
        next();
      } else {
        res.status(200).send("Please Login");
      }
    } catch (error) {
      res.status(400).send({ msg: error });
    }
  } else {
    res.send(200).send({ msg: "Please Login First" });
  }
};

module.exports = { auth };
