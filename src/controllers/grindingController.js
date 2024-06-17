const { Grinding } = require("../models/models");

const GrindingController = {
	createGrinding: async (request, h) => {
		try {
			const { grinding_name, saranpenyajian } = req.body;

			const newGrinding = await Grinding.create({
				grinding_name,
				saranpenyajian,
			});

			return h
				.response({
					message: "Grinding created successfully",
					grinding: newGrinding,
				})
				.status(201);
		} catch (err) {
			console.error("Error creating grinding:", err);
			return h.response({ message: "Error creating grinding" }).status(500);
		}
	},

	getAllGrindings: async (request, h) => {
		try {
			const grindings = await Grinding.findAll();

			return h.response(grindings).status(200);
		} catch (err) {
			console.error("Error fetching grindings:", err);
			return h.response({ message: "Error fetching grindings" }).status(500);
		}
	},

	getGrindingById: async (request, h) => {
		const { id } = req.params;

		try {
			const grinding = await Grinding.findByPk(id);

			if (!grinding) {
				return h.response({ message: "Grinding not found" }).status(404);
			}

			return h.response(grinding).status(200);
		} catch (err) {
			console.error("Error fetching grinding by ID:", err);
			return h
				.response({ message: "Error fetching grinding by ID" })
				.status(500);
		}
	},

	updateGrinding: async (request, h) => {
		const { id } = req.params;
		const { grinding_name, saranpenyajian } = req.body;

		try {
			let grinding = await Grinding.findByPk(id);

			if (!grinding) {
				return h.response({ message: "Grinding not found" }).status(404);
			}

			grinding = await grinding.update({
				grinding_name,
				saranpenyajian,
			});

			return res.response().code(200);
		} catch (err) {
			console.error("Error updating grinding:", err);
			return h.response({ message: "Error updating grinding" }).status(500);
		}
	},

	deleteGrinding: async (request, h) => {
		const { id } = req.params;

		try {
			const grinding = await Grinding.findByPk(id);

			if (!grinding) {
				return h.response({ message: "Grinding not found" }).status(404);
			}

			await grinding.destroy();

			return h
				.response({ message: "Grinding deleted successfully" })
				.status(200);
		} catch (err) {
			console.error("Error deleting grinding:", err);
			return h.response({ message: "Error deleting grinding" }).status(500);
		}
	},
};

module.exports = GrindingController;
