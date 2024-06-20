const CoffeeLlmController = require("../controllers/coffeeLlmController");

module.exports = [
	{
		method: "GET",
		path: "/fun-fact",
		handler: CoffeeLlmController.getCoffeeFunFact,
	},
];
