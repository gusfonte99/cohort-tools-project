const router = require("express").Router();
const mongoose = require("mongoose");
const User = require("../models/User.model");

router.get("/users/:id", (req, res, next) => {
    const {id} = req.params
    
    User.findById(id)
    .then((user) => {
     res.json(user); 
    })
    .catch((error) => {
     console.log("Error getting user from DB...", error);
     next(error)
   });
   
   });

module.exports = router;