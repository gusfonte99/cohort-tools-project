const router = require("express").Router();
const mongoose = require("mongoose");
const Cohort = require("../models/Cohort.model");

router.get("/cohorts", (req, res, next) => {
    Cohort.find()
    .then((cohort) => {
     res.json(cohort); 
    })
    .catch((error) => {
     console.log("Error getting cohort from DB...", error);
     next(error)
   });
   
   });
   
   router.get("/cohorts/:cohortId", (req, res, next) => {
     const { cohortId } = req.params;
   
     Cohort.findById(cohortId)
       .then((cohortFromDB) => {
         res.send(cohortFromDB);
       })
       .catch((error) => {
         console.log("Error getting cohort details from DB...", error);
         next(error)
       });
   });
   
   router.post("/cohorts", (req, res, next) => {
     Cohort.create(req.body)
       .then(() => {
         res.status(201).send("Cohort created");
       })
       .catch((error) => {
         console.log("Error creating cohort in DB...", error);
         next(error)
       });
   });
   
   router.put("/cohorts/:cohortId", (req, res, next) => {
     const { cohortId } = req.params;
   
     Cohort.findByIdAndUpdate(cohortId, req.body, { new: true })
       .then(() => {
         res.send("Cohort is updated");
       })
       .catch((error) => {
         console.log("Error updating cohort in DB...", error);
         next(error)
       });
   });
   
   router.delete("/cohorts/:cohortId", (req, res, next) => {
     const { cohortId } = req.params;
   
     Cohort.findByIdAndDelete(cohortId)
       .then(() => {
         res.send("Cohort was deleted");
       })
       .catch((error) => {
         console.log("Error deleting cohort from DB...", error);
         next(error)
       });
   });


module.exports = router;