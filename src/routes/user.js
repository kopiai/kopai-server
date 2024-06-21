const UserController = require("../controllers/userController");

module.exports = [
	{
		method: "POST",
		path: "/users/register",
		handler: UserController.register,
	},
	{
		method: "POST",
		path: "/users/login",
		handler: UserController.login,
	},
	{
		method: "GET",
		path: "/users/profile/{user_id}",
		handler: UserController.getUserById,
	},
	{
		method: "PUT",
		path: "/users/update/{user_id}",
		handler: UserController.update,
	},
];
