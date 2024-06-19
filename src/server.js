require("dotenv").config();
const Hapi = require("@hapi/hapi");
const { Sequelize } = require("sequelize");
const axios = require("axios");
const databaseConfig = require("./config/database");
const routes = require("./routes");
const sequelize = new Sequelize(databaseConfig);
const jwt = require("jsonwebtoken");
const validateToken = require("./middlewares/authMiddleware");

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

    await server.register(require("hapi-auth-jwt2"));

    server.auth.strategy("jwt", "jwt", {
        key: process.env.JWT_SECRET,
        validate: validateToken,
        verifyOptions: { algorithms: ["HS256"] },
    });

    server.route({
        method: 'GET',
        path: '/fun-fact',
        handler: async (request, h) => {
            const coffeeName = request.query.name;
            if (!coffeeName) {
                return h.response({ error: 'Nama kopi tidak diberikan.' }).code(400);
            }

            try {
                const question = `Buat Fun Fact mengenai kopi ${coffeeName}`;
                const response = await axios.post(
                    'https://api.google.com/generativeai/v1/generateContent', 
                    {
                        input: `Bertindaklah sebagai barista di sebuah kedai kopi yang nyaman. Jawab tanpa menambahkan pertanyaan baru. Jawab pertanyaan berikut: ${question}`
                    },
                    {
                        headers: {
                            'Authorization': `Bearer ${process.env.GEMINI_API_KEY}`,
                            'Content-Type': 'application/json'
                        }
                    }
                );

                return { funFact: response.data.result };
            } catch (error) {
                console.error(error);
                return h.response({ error: 'Terjadi kesalahan saat mengambil fun fact.' }).code(500);
            }
        }
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
