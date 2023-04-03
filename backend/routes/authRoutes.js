const express = require("express");
const router = express.Router();
const authService = require("../services/authService");


// add a new user
router.post("/register", authService.register);

// login
router.post("/login", authService.login);

//insert time
router.post("/time", authService.insertTime);
module.exports = router;
