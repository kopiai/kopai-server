const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require("./controllers/userController");

const verifyToken = async (request, h) => {
    try {
        const authorizationHeader = request.headers.authorization;

        if (!authorizationHeader) {
            return h.response({ message: 'Authorization header missing' }).code(401);
        }

        const token = authorizationHeader.split(' ')[1]; 

        if (!token) {
            return h.response({ message: 'Token not provided' }).code(401);
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        request.user = decoded; 

        return h.continue;
    } catch (error) {
        console.error('Error verifying token:', error);
        return h.response({ message: 'Invalid token' }).code(401);
    }
};

module.exports = verifyToken;
