const UserController = require('../controllers/user');

module.exports = [
    {
        method: 'POST',
        path: '/users/register',
        handler: UserController.register
    },
    {
        method: 'POST',
        path: '/users/login',
        handler: UserController.login
    },
    {
        method: 'PUT',
        path: '/users/update',
        handler: UserController.update
    }
];
