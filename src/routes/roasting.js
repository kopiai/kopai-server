const RoastingController = require("../controllers/roastingController");

const router = [
	{
		method: "POST",
		path: "/roastings",
		handler: RoastingController.createRoasting,
	},
	{
		method: "GET",
		path: "/roastings",
		handler: RoastingController.getAllRoastings,
	},
	{
		method: "GET",
		path: "/roastings/{id}",
		handler: RoastingController.getRoastingById,
	},
	{
		method: "PUT",
		path: "/roastings/{id}",
		handler: RoastingController.updateRoasting,
	},
	{
		method: "DELETE",
		path: "/roastings/{id}",
		handler: RoastingController.deleteRoasting,
	},
];

module.exports = router;
