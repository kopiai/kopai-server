module.exports = {
	username: process.env.DB_USER || "root",
	password: process.env.DB_PASSWORD || "",
	database: process.env.DB_NAME || "kopai_database",
	host: process.env.DB_HOST || "localhost",
	port: process.env.DB_PORT || 3306,
	dialect: "mysql",
};
