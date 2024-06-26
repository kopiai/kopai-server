require("dotenv").config();
const Hapi = require("@hapi/hapi");
const { Sequelize } = require("sequelize");
const databaseConfig = require("./config/database");
const routes = require("./routes");
const sequelize = new Sequelize(databaseConfig);
const jwt = require("jsonwebtoken");
const validateToken = require("./middlewares/authMiddleware");

const init = async () => {
	const server = Hapi.server({
		port: process.env.PORT || 3000,
		host: process.env.HOST || "0.0.0.0",
		debug: { request: ["*"] },
	});

	try {
		await sequelize.authenticate();
		console.log("Database connected successfully.");
	} catch (error) {
		console.error("Unable to connect to the database:", error);
	}

	await server.register(require("hapi-auth-jwt2"));

	server.auth.strategy("jwt", "jwt", {
		key: process.env.JWT_SECRET,
		validate: validateToken,
		verifyOptions: { algorithms: ["HS256"] },
	});

	server.route(routes);

	try {
		await server.start();
		console.log("Server running on %s", server.info.uri);
	} catch (error) {
		console.error("Error starting server:", error);
	}
};

process.on("unhandledRejection", (err) => {
	console.log(err);
	process.exit(1);
});

init();
