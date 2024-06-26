const BlendController = require("../controllers/blendController");

module.exports = [
	{
		method: "GET",
		path: "/blends/{blend_id}",
		handler: BlendController.getBlendById,
	},
	{
		method: "POST",
		path: "/blends",
		handler: BlendController.createBlend,
	},
	{
		method: "PUT",
		path: "/blends/{blend_id}",
		handler: BlendController.updateBlend,
	},
	{
		method: "DELETE",
		path: "/blends/{blend_id}",
		handler: BlendController.deleteBlend,
	},
];
