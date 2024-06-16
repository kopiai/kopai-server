const { Sequelize, Op } = require("sequelize");
const { Blend } = require("../models/models");
const { Coffee } = require("../models/models");
const { Product } = require("../models/models");
const { Roasting } = require("../models/models");
const { Grinding } = require("../models/models");
const { User } = require("../models/models");

const createBlend = async (req, res) => {
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
			return res.status(404).json({ error: "User not found" });
		}

		const coffee1 = await Coffee.findByPk(coffee_id1, { transaction: t });
		const coffee2 = await Coffee.findByPk(coffee_id2, { transaction: t });

		if (!coffee1 || !coffee2) {
			await t.rollback();
			return res.status(404).json({ error: "One or more coffees not found" });
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

		return res.status(201).json({ blend, product });
	} catch (error) {
		await t.rollback();
		console.error("Error creating blend:", error);
		return res.status(500).json({ error: "Internal server error" });
	}
};

module.exports = {
	createBlend,
};
