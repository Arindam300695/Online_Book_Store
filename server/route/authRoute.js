const express = require("express");
const {
	registrationController,
	loginController,
} = require("../controller/authController");
const authRouter = express.Router();

authRouter.post("/register", registrationController);
authRouter.post("/login", loginController);

module.exports = authRouter;
