const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const PORT = 5005;

const { errorHandler, notFoundHandler } = require("./middleware/error-handling")
const { isAuthenticated } = require("./middleware/jwt.middleware");
require("dotenv").config();

const cohorts = require("./cohorts.json");
const students = require("./students.json");
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/cohort-tools-api")
  .then((x) => console.log(`Connected to Database: "${x.connections[0].name}"`))
  .catch((err) => console.error("Error connecting to MongoDB", err));

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

app.use("/api", require("./routes/cohort.routes"))
app.use("/api", require("./routes/student.routes"))
app.use("/api", isAuthenticated, require("./routes/user.routes"))
app.use("/auth", require("./routes/auth.routes"))

app.use(notFoundHandler)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});


