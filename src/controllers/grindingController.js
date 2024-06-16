const { Grinding } = require("../models/models");

const GrindingController = {
	createGrinding: async (req, res) => {
		try {
			const { grinding_name, saranpenyajian } = req.body;

			const newGrinding = await Grinding.create({
				grinding_name,
				saranpenyajian,
			});

			return res.status(201).json({
				message: "Grinding created successfully",
				grinding: newGrinding,
			});
		} catch (err) {
			console.error("Error creating grinding:", err);
			return res.status(500).json({ message: "Error creating grinding" });
		}
	},

	getAllGrindings: async (req, res) => {
		try {
			const grindings = await Grinding.findAll();

			return res.status(200).json(grindings);
		} catch (err) {
			console.error("Error fetching grindings:", err);
			return res.status(500).json({ message: "Error fetching grindings" });
		}
	},

	getGrindingById: async (req, res) => {
		const { id } = req.params;

		try {
			const grinding = await Grinding.findByPk(id);

			if (!grinding) {
				return res.status(404).json({ message: "Grinding not found" });
			}

			return res.status(200).json(grinding);
		} catch (err) {
			console.error("Error fetching grinding by ID:", err);
			return res.status(500).json({ message: "Error fetching grinding by ID" });
		}
	},

	updateGrinding: async (req, res) => {
		const { id } = req.params;
		const { grinding_name, saranpenyajian } = req.body;

		try {
			let grinding = await Grinding.findByPk(id);

			if (!grinding) {
				return res.status(404).json({ message: "Grinding not found" });
			}

			grinding = await grinding.update({
				grinding_name,
				saranpenyajian,
			});

			return res
				.status(200)
				.json({ message: "Grinding updated successfully", grinding });
		} catch (err) {
			console.error("Error updating grinding:", err);
			return res.status(500).json({ message: "Error updating grinding" });
		}
	},

	deleteGrinding: async (req, res) => {
		const { id } = req.params;

		try {
			const grinding = await Grinding.findByPk(id);

			if (!grinding) {
				return res.status(404).json({ message: "Grinding not found" });
			}

			await grinding.destroy();

			return res.status(200).json({ message: "Grinding deleted successfully" });
		} catch (err) {
			console.error("Error deleting grinding:", err);
			return res.status(500).json({ message: "Error deleting grinding" });
		}
	},
};

module.exports = GrindingController;
