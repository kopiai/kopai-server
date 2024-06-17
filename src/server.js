require("dotenv").config();
const Hapi = require("@hapi/hapi");
const { Sequelize } = require("sequelize");
const databaseConfig = require("./config/database");
const routes = require("./routes");

const sequelize = new Sequelize(databaseConfig);

const init = async () => {
	const server = Hapi.server({
		port: process.env.PORT || 3000,
		host: process.env.HOST || "0.0.0.0",
	});

	try {
		await sequelize.authenticate();
		console.log("Database connected successfully.");
	} catch (error) {
		console.error("Unable to connect to the database:", error);
	}

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
