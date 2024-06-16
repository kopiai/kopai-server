const { Coffee } = require("../models/models");

const CoffeeController = {
	getAllCoffees: async (request, h) => {
		try {
			const coffees = await Coffee.findAll();
			return h.response(coffees).code(200);
		} catch (err) {
			console.error("Error fetching coffees:", err);
			return h.response({ message: "Error fetching coffees" }).code(500);
		}
	},

	getCoffeeById: async (request, h) => {
		try {
			const { id } = request.params;
			const coffee = await Coffee.findByPk(id);
			if (!coffee) {
				return h.response({ message: "Coffee not found" }).code(404);
			}
			return h.response(coffee).code(200);
		} catch (err) {
			console.error("Error fetching coffee:", err);
			return h.response({ message: "Error fetching coffee" }).code(500);
		}
	},

	addCoffee: async (request, h) => {
		try {
			const { coffeeName, quantity } = request.payload;
			const newCoffee = await Coffee.create({
				coffeeName,
				quantity,
			});
			return h
				.response({ message: "Coffee added successfully", coffee: newCoffee })
				.code(201);
		} catch (err) {
			console.error("Error adding coffee:", err);
			return h.response({ message: "Error adding coffee" }).code(500);
		}
	},

	updateCoffee: async (request, h) => {
		try {
			const { id } = request.params;
			const { coffeeName, quantity } = request.payload;

			const coffee = await Coffee.findByPk(id);
			if (!coffee) {
				return h.response({ message: "Coffee not found" }).code(404);
			}

			coffee.coffeeName = coffeeName;
			coffee.quantity = quantity;
			await coffee.save();

			return h
				.response({ message: "Coffee updated successfully", coffee })
				.code(200);
		} catch (err) {
			console.error("Error updating coffee:", err);
			return h.response({ message: "Error updating coffee" }).code(500);
		}
	},

	deleteCoffee: async (request, h) => {
		try {
			const { id } = request.params;

			const coffee = await Coffee.findByPk(id);
			if (!coffee) {
				return h.response({ message: "Coffee not found" }).code(404);
			}

			await coffee.destroy();

			return h.response({ message: "Coffee deleted successfully" }).code(200);
		} catch (err) {
			console.error("Error deleting coffee:", err);
			return h.response({ message: "Error deleting coffee" }).code(500);
		}
	},
};

module.exports = CoffeeController;
