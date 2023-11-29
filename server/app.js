const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const PORT = 5005;

const Cohort = require("./models/Cohort.model");
const Student = require("./models/Student.model");

// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
// ...

const cohorts = require("./cohorts.json");
const students = require("./students.json");
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/cohort-tools-api")
  .then((x) => console.log(`Connected to Database: "${x.connections[0].name}"`))
  .catch((err) => console.error("Error connecting to MongoDB", err));

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();

// MIDDLEWARE
// Research Team - Set up CORS middleware here:
// ...
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
// ...
app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

app.get("/api/cohorts", (req, res) => {
  res.json(cohorts);
});

app.get("/api/cohorts/:cohortId", (req, res) => {
  const { cohortId } = req.params;

  Cohort.findById(cohortId)
    .then((cohortFromDB) => {
      res.send(cohortFromDB);
    })
    .catch((error) => {
      console.log("Error getting cohort details from DB...", error);
      res.send("Error getting cohort details from DB...");
    });
});

app.post("/api/cohorts", (req, res) => {
  Cohort.create(req.body)
    .then(() => {
      res.status(201).send("Cohort created");
    })
    .catch((error) => {
      console.log("Error creating cohort in DB...", error);
      res.send("Error creating cohort in DB...");
    });
});

app.put("/api/cohorts/:cohortId", (req, res) => {
  const { cohortId } = req.params;

  Cohort.findByIdAndUpdate(cohortId, req.body, { new: true })
    .then(() => {
      res.send("Cohort is updated");
    })
    .catch((error) => {
      console.log("Error updating cohort in DB...", error);
      res.send("Error updating cohort in DB...");
    });
});

app.delete("/api/cohorts/:cohortId", (req, res) => {
  const { cohortId } = req.params;

  Cohort.findByIdAndDelete(cohortId)
    .then(() => {
      res.send("Cohort was deleted");
    })
    .catch((error) => {
      console.log("Error deleting cohort from DB...", error);
      res.send("Error deleting cohort from DB...");
    });
});

app.get("/api/students", (req, res) => {
  Student.find()
    .populate("cohort")
    .then(() => res.json(students))
    .catch((error) => {
      console.log("Error getting students from DB...", error);
      res.send("Error getting students from DB");
    });
});

app.get("/api/students/cohort/:cohortId", (req, res) => {
  const { cohortId } = req.params;

  Student.find({ cohort: cohortId })
    .populate("cohort")
    .then((studentFromDB) => {
      res.send(studentFromDB);
    })
    .catch((error) => {
      console.log("Error getting student details from DB...", error);
      res.send("Error getting student details from DB...");
    });
});

app.get("/api/students/:studentId", (req, res) => {
  const { studentId } = req.params;

  Student.findById(studentId)
    .populate("cohort")
    .then((studentFromDB) => {
      res.send(studentFromDB);
    })
    .catch((error) => {
      console.log("Error getting student details from DB...", error);
      res.send("Error getting student details from DB...");
    });
});

app.post("/api/students", (req, res) => {
  Student.create(req.body)
    .then((createdStudent) => {
      res.status(201).send("A student is created");
    })
    .catch((error) => {
      console.log("Error creating student in DB...", error);
      res.send("Error creating student in DB...");
    });
});

app.put("/api/students/:studentId", (req, res) => {
  const { studentId } = req.params;

  Student.findByIdAndUpdate(studentId, req.body, { new: true })
    .then(() => {
      res.send("Student is updated");
    })
    .catch((error) => {
      console.log("Error updating student in DB...", error);
      res.send("Error updating student in DB...");
    });
});

app.delete("/api/students/:studentId", (req, res) => {
  const { studentId } = req.params;

  Student.findByIdAndDelete(studentId)
    .then(() => {
      res.send("Student was deleted");
    })
    .catch((error) => {
      console.log("Error deleting student from DB...", error);
      res.send("Error deleting student from DB...");
    });
});

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
