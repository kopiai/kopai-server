const { Roasting } = require("../models/models");

const RoastingController = {
	createRoasting: async (req, res) => {
		try {
			const { roasting_type, celcius, color, flavor, output } = req.body;

			const newRoasting = await Roasting.create({
				roasting_type,
				celcius,
				color,
				flavor,
				output,
			});

			return res.status(201).json({
				message: "Roasting created successfully",
				roasting: newRoasting,
			});
		} catch (err) {
			console.error("Error creating roasting:", err);
			return res.status(500).json({ message: "Error creating roasting" });
		}
	},

	getAllRoastings: async (req, res) => {
		try {
			const roastings = await Roasting.findAll();

			return res.status(200).json(roastings);
		} catch (err) {
			console.error("Error fetching roastings:", err);
			return res.status(500).json({ message: "Error fetching roastings" });
		}
	},

	getRoastingById: async (req, res) => {
		const { id } = req.params;

		try {
			const roasting = await Roasting.findByPk(id);

			if (!roasting) {
				return res.status(404).json({ message: "Roasting not found" });
			}

			return res.status(200).json(roasting);
		} catch (err) {
			console.error("Error fetching roasting by ID:", err);
			return res.status(500).json({ message: "Error fetching roasting by ID" });
		}
	},

	updateRoasting: async (req, res) => {
		const { id } = req.params;
		const { roasting_type, celcius, color, flavor, output } = req.body;

		try {
			let roasting = await Roasting.findByPk(id);

			if (!roasting) {
				return res.status(404).json({ message: "Roasting not found" });
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
				.json({ message: "Roasting updated successfully", roasting });
		} catch (err) {
			console.error("Error updating roasting:", err);
			return res.status(500).json({ message: "Error updating roasting" });
		}
	},

	deleteRoasting: async (req, res) => {
		const { id } = req.params;

		try {
			const roasting = await Roasting.findByPk(id);

			if (!roasting) {
				return res.status(404).json({ message: "Roasting not found" });
			}

			await roasting.destroy();

			return res.status(200).json({ message: "Roasting deleted successfully" });
		} catch (err) {
			console.error("Error deleting roasting:", err);
			return res.status(500).json({ message: "Error deleting roasting" });
		}
	},
};

module.exports = RoastingController;
