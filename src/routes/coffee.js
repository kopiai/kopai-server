const CoffeeController = require("../controllers/coffee");

const routes = [
	{
		method: "GET",
		path: "/coffees",
		handler: CoffeeController.getAllCoffees,
	},
	{
		method: "GET",
		path: "/blends/{blend_id}/coffee",
		handler: CoffeeController.getCoffeeById,
	},
	{
		method: "POST",
		path: "/coffee/add",
		handler: CoffeeController.addCoffee,
	},
	{
		method: "PUT",
		path: "/coffees/{id}",
		handler: CoffeeController.updateCoffee,
	},
	{
		method: "DELETE",
		path: "/coffee/delete/{coffee_id}",
		handler: CoffeeController.deleteCoffee,
	},
];

module.exports = routes;
