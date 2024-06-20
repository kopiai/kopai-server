const jwt = require("jsonwebtoken");
require("dotenv").config();

const validateToken = async (request, h) => {
	const authorization = request.headers.authorization;

	if (!authorization) {
		return h.response({ message: "No token provided" }).code(401).takeover();
	}

	const token = authorization.split(" ")[1];
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		request.user = decoded;
		return h.continue;
	} catch (err) {
		return h.response({ message: "Invalid token" }).code(401).takeover();
	}
};

module.exports = validateToken;
