module.exports = {
	username: process.env.DB_USER || "root",
	password: process.env.DB_PASSWORD || "admin1234",
	database: process.env.DB_NAME || "kopai_database",
	host: process.env.DB_HOST || "34.128.126.190",
	port: process.env.DB_PORT || 3306,
	dialect: "mysql",
};
