const { Roasting } = require("../models/models");

const RoastingController = {
	createRoasting: async (request, h) => {
		try {
			const { roasting_type, celcius, color, flavor, output } = req.body;

			const newRoasting = await Roasting.create({
				roasting_type,
				celcius,
				color,
				flavor,
				output,
			});

			return h
				.response({
					message: "Roasting created successfully",
					roasting: newRoasting,
				})
				.status(201);
		} catch (err) {
			console.error("Error creating roasting:", err);
			return h.response({ message: "Error creating roasting" }).status(500);
		}
	},

	getAllRoastings: async (request, h) => {
		try {
			const roastings = await Roasting.findAll();

			return h.response(roastings).status(200);
		} catch (err) {
			console.error("Error fetching roastings:", err);
			return h.response({ message: "Error fetching roastings" }).status(500);
		}
	},

	getRoastingById: async (request, h) => {
		const { id } = req.params;

		try {
			const roasting = await Roasting.findByPk(id);

			if (!roasting) {
				return h.response({ message: "Roasting not found" }).status(404);
			}

			return h.response(roasting).status(200);
		} catch (err) {
			console.error("Error fetching roasting by ID:", err);
			return h
				.response({ message: "Error fetching roasting by ID" })
				.status(500);
		}
	},

	updateRoasting: async (request, h) => {
		const { id } = req.params;
		const { roasting_type, celcius, color, flavor, output } = req.body;

		try {
			let roasting = await Roasting.findByPk(id);

			if (!roasting) {
				return h.response({ message: "Roasting not found" }).status(404);
			}

			roasting = await roasting.update({
				roasting_type,
				celcius,
				color,
				flavor,
				output,
			});

			return res
				.status(200)
				.response({ message: "Roasting updated successfully", roasting });
		} catch (err) {
			console.error("Error updating roasting:", err);
			return h.response({ message: "Error updating roasting" }).status(500);
		}
	},

	deleteRoasting: async (request, h) => {
		const { id } = req.params;

		try {
			const roasting = await Roasting.findByPk(id);

			if (!roasting) {
				return h.response({ message: "Roasting not found" }).status(404);
			}

			await roasting.destroy();

			return h
				.response({ message: "Roasting deleted successfully" })
				.status(200);
		} catch (err) {
			console.error("Error deleting roasting:", err);
			return h.response({ message: "Error deleting roasting" }).status(500);
		}
	},
};

module.exports = RoastingController;
