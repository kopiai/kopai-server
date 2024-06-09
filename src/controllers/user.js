const UserController = {
    register: async (request, h) => {
       
        return h.response({ message: 'User registered successfully' }).code(201);
    },
    login: async (request, h) => {
        
        return h.response({ message: 'User logged in successfully' }).code(200);
    },
    update: async (request, h) => {
        
        return h.response({ message: 'User updated successfully' }).code(200);
    }
};

module.exports = UserController;
