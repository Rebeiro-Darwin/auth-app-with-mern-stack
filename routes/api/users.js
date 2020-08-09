const express = require("express");
const router = express.Router();
const usersController = require("../../controllers/userController");

// @route POST api/users/register
router.post("/register", usersController.registerUser);

// @route POST api/users/login
router.post("/login", usersController.loginUser);

module.exports = router;
