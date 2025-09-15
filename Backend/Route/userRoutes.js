const express = require("express");
const { register, login , resetpassword , updateUser} = require("../Controller/userController");

const router = express.Router();

// Register user
router.post("/register", register);

// Login user
router.post("/login", login);
router.post("/update", updateUser);

// Reset Password
router.post("/resetpassword", resetpassword);

module.exports = router;
