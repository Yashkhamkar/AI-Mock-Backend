const express = require("express");
const connectDB = require("./utils/db");
const dotenv = require("dotenv").config();
const cors = require("cors");
const app = express();
const port = process.env.PORT;
const Mockroute = require("./Routes/Mock.routes");
const UserAnswerRoute = require("./Routes/UserAnswer.routes");

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/api", Mockroute);
app.use("/user", UserAnswerRoute);

connectDB();
