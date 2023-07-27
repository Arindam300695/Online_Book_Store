const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
require("dotenv").config();

const authMiddleware = asyncHandler(async (req, res, next) => {
	const token = req.headers.authorization;
	if (!token) return res.json({ message: "unauthorized user" });
	const isVerified = jwt.verify(token, process.env.secret_key);
	try {
		if (isVerified) {
			req.userId = isVerified.id;
			next();
		}
	} catch (error) {
		return res.json({ error: error.message });
	}
});

module.exports = authMiddleware;
