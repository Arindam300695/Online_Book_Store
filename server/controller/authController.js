const User = require("../model/userModel");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const saltrounds = 12;
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Registration controller
const registrationController = asyncHandler(async (req, res) => {
    const { firstName, lastName, email, age, password } = req.body;

    // Checking if no field is empty or not
    if (!firstName || !lastName || !email || !age || !password) {
        return res.json({ error: "All the fields are required" });
    }

    // Checking if the user is already registered with the provided email address or not
    const result = await User.findOne({ email });
    if (result) {
        return res.json({ error: "User already exists" });
    }

    // If the user is not already registered, then the password needs to be hashed
    const hashedPassword = await bcrypt.hash(password, saltrounds);
    const newUser = new User({
        firstName,
        lastName,
        email,
        age,
        password: hashedPassword,
    });
    await newUser.save();

    try {
        const user = { name: firstName + " " + lastName, email, age };
        return res.json({ message: "Registration successful", user });
    } catch (error) {
        return res.json({ error: error.message });
    }
});

// Login controller
const loginController = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Checking if no field is empty or not
    if (!email || !password) {
        return res.json({ error: "All the fields are required" });
    }

    // Checking if the user is already registered with the provided email address or not
    const result = await User.findOne({ email });
    if (!result) {
        return res.json({ error: "User is not registered" });
    }

    // If the user is registered, then comparing the provided password with the hashed one saved in the database
    const isMatched = await bcrypt.compare(password, result.password);
    if (!isMatched) {
        return res.json({ error: "Invalid login credentials" });
    }

    // If everything is fine, then logging in the user and creating a token to be sent to the user after successful login
    const token = jwt.sign({ id: result._id }, process.env.secret_key);
    const user = {
        userName: result.firstName + " " + result.lastName,
        userEmail: result.email,
        userAge: result.age,
    };

    try {
        return res.json({ message: "Login successful", user, token });
    } catch (error) {
        return res.json({ error: error.message });
    }
});

module.exports = { registrationController, loginController };
