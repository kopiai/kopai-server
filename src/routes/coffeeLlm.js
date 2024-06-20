const CoffeeLlmController = require("../controllers/coffeeLlmController");

module.exports = [
	{
		method: "GET",
		path: "/ai/fun-fact",
		handler: CoffeeLlmController.getCoffeeFunFact,
	},
	{
		method: "GET",
		path: "/ai/blend",
		handler: CoffeeLlmController.getCoffeeBlend,
	},
	{
		method: "GET",
		path: "/ai/roasting",
		handler: CoffeeLlmController.getCoffeeRoasting,
	},
];
