const { Blend } = require("../models/models");
const { Coffee } = require("../models/models");
const { Product } = require("../models/models");
const { Roasting } = require("../models/models");
const { Grinding } = require("../models/models");
const { User } = require("../models/models");

const createBlend = async (request, h) => {
	const {
		coffee_id1,
		coffee_id2,
		percentage,
		ukuran_gram,
		roast_id,
		grind_id,
		user_id,
		blend_name,
		description,
	} = req.body;

	const t = await sequelize.transaction();

	try {
		const user = await User.findByPk(user_id, { transaction: t });
		if (!user) {
			await t.rollback();
			return h.response({ error: "User not found" }).status(404);
		}

		const coffee1 = await Coffee.findByPk(coffee_id1, { transaction: t });
		const coffee2 = await Coffee.findByPk(coffee_id2, { transaction: t });

		if (!coffee1 || !coffee2) {
			await t.rollback();
			return h.response({ error: "One or more coffees not found" }).status(404);
		}

		const roast = await Roasting.findByPk(roast_id, { transaction: t });

		const grind = await Grinding.findByPk(grind_id, { transaction: t });

		const product_id = Math.floor(Math.random() * 1000);
		const blend = await Blend.create(
			{
				coffee_id1,
				coffee_id2,
				percentage,
				ukuran_gram,
				roast_id,
				grind_id,
				product_id,
				user_id,
				blend_name,
				description,
			},
			{ transaction: t },
		);

		const product = await Product.create(
			{
				product_id,
				name: blend_name,
				description,
			},
			{ transaction: t },
		);

		await t.commit();

		return h.response({ blend, product }).status(201);
	} catch (error) {
		await t.rollback();
		console.error("Error creating blend:", error);
		return h.response({ error: "Internal server error" }).status(500);
	}
};

const getAllBlends = async (request, h) => {
	try {
		const blends = await Blend.findAll();

		return h.response(blends).status(200);
	} catch (error) {
		console.error("Error fetching blends:", error);
		return h.response({ error: "Internal server error" }).status(500);
	}
};

const getBlendById = async (request, h) => {
	const { id } = req.params;

	try {
		const blend = await Blend.findByPk(id);

		if (!blend) {
			return h.response({ error: "Blend not found" }).status(404);
		}

		return h.response(blend).status(200);
	} catch (error) {
		console.error("Error fetching blend by ID:", error);
		return h.response({ error: "Internal server error" }).status(500);
	}
};

const updateBlend = async (request, h) => {
	const { id } = req.params;
	const {
		coffee_id1,
		coffee_id2,
		percentage,
		ukuran_gram,
		roast_id,
		grind_id,
		user_id,
		blend_name,
		description,
	} = req.body;

	const t = await sequelize.transaction();

	try {
		const blend = await Blend.findByPk(id, { transaction: t });

		if (!blend) {
			await t.rollback();
			return h.response({ error: "Blend not found" }).status(404);
		}

		const user = await User.findByPk(user_id, { transaction: t });

		if (!user) {
			await t.rollback();
			return h.response({ error: "User not found" }).status(404);
		}

		const coffee1 = await Coffee.findByPk(coffee_id1, { transaction: t });
		const coffee2 = await Coffee.findByPk(coffee_id2, { transaction: t });

		if (!coffee1 || !coffee2) {
			await t.rollback();
			return h.response({ error: "One or more coffees not found" }).status(404);
		}

		const roast = await Roasting.findByPk(roast_id, { transaction: t });

		const grind = await Grinding.findByPk(grind_id, { transaction: t });

		await blend.update(
			{
				coffee_id1,
				coffee_id2,
				percentage,
				ukuran_gram,
				roast_id,
				grind_id,
				user_id,
				blend_name,
				description,
			},
			{ transaction: t },
		);

		await t.commit();

		return h.response({ message: "Blend updated successfully" }).status(200);
	} catch (error) {
		await t.rollback();
		console.error("Error updating blend:", error);
		return h.response({ error: "Internal server error" }).status(500);
	}
};

const deleteBlend = async (request, h) => {
	const { id } = req.params;

	const t = await sequelize.transaction();

	try {
		const blend = await Blend.findByPk(id, { transaction: t });

		if (!blend) {
			await t.rollback();
			return h.response({ error: "Blend not found" }).status(404);
		}

		await blend.destroy({ transaction: t });

		await t.commit();

		return h.response({ message: "Blend deleted successfully" }).status(200);
	} catch (error) {
		await t.rollback();
		console.error("Error deleting blend:", error);
		return h.response({ error: "Internal server error" }).status(500);
	}
};

module.exports = {
	createBlend,
	getAllBlends,
	getBlendById,
	updateBlend,
	deleteBlend,
};
