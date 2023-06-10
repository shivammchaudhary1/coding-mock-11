const express = require(`express`);
const app = express();
var cors = require("cors");
require("dotenv").config();
const { connection } = require("./config/db");
const { userRouter } = require("./routes/user.route");
const { userProfile } = require("./routes/profile.route");
const { auth } = require(`./middleware/auth.middleware`);

app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("Home Page");
});

app.use("/", userRouter);
app.use(auth);
app.use("/", userProfile);

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log(`Server is Connected to Database`);
  } catch (error) {
    console.log({ error });
  }

  console.log(`Server is Starting at PORT ${process.env.PORT}`);
});
