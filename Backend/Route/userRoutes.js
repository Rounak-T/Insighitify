const express = require("express");
const { register, login , updateUser} = require("../Controller/userController");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/update", updateUser);

module.exports = router;
