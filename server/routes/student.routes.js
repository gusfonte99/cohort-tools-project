const router = require("express").Router();
const mongoose = require("mongoose");
const Student = require("../models/Student.model");

router.get("/students", (req, res, next) => {
    Student.find()
      .populate("cohort")
      .then((students) => res.json(students))
      .catch((error) => {
        console.log("Error getting students from DB...", error);
        next(error)
      });
  });
  
  router.get("/students/cohort/:cohortId", (req, res, next) => {
    const { cohortId } = req.params;
  
    Student.find({ cohort: cohortId })
      .populate("cohort")
      .then((studentFromDB) => {
        res.send(studentFromDB);
      })
      .catch((error) => {
        console.log("Error getting student details from DB...", error);
        next(error)
      });
  });
  
  router.get("/students/:studentId", (req, res, next) => {
    const { studentId } = req.params;
  
    Student.findById(studentId)
      .populate("cohort")
      .then((studentFromDB) => {
        res.send(studentFromDB);
      })
      .catch((error) => {
        console.log("Error getting student details from DB...", error);
        next(error)
      });
  });
  
  router.post("/students", (req, res, next) => {
    Student.create(req.body)
      .then((createdStudent) => {
        res.status(201).send("A student is created");
      })
      .catch((error) => {
        console.log("Error creating student in DB...", error);
        next(error)
      });
  });
  
  router.put("/students/:studentId", (req, res, next) => {
    const { studentId } = req.params;
  
    Student.findByIdAndUpdate(studentId, req.body, { new: true })
      .then(() => {
        res.send("Student is updated");
      })
      .catch((error) => {
        console.log("Error updating student in DB...", error);
        next(error)
      });
  });
  
  router.delete("/students/:studentId", (req, res, next) => {
    const { studentId } = req.params;
  
    Student.findByIdAndDelete(studentId)
      .then(() => {
        res.send("Student was deleted");
      })
      .catch((error) => {
        console.log("Error deleting student from DB...", error);
        next(error)
      });
  });
  


module.exports = router;