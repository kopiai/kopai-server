const GrindingController = require("../controllers/grindingController");

module.exports = [
	{
		method: "POST",
		path: "/grindings",
		handler: GrindingController.createGrinding,
	},
	{
		method: "GET",
		path: "/grindings",
		handler: GrindingController.getAllGrindings,
	},
	{
		method: "GET",
		path: "/grindings/{id}",
		handler: GrindingController.getGrindingById,
	},
	{
		method: "PUT",
		path: "/grindings/{id}",
		handler: GrindingController.updateGrinding,
	},
	{
		method: "DELETE",
		path: "/grindings/{id}",
		handler: GrindingController.deleteGrinding,
	},
];
