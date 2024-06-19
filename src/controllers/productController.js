const { Product } = require("../models/models");

const ProductController = {
	createProduct: async (request, h) => {
		try {
			const {
				blend_id,
				product_name,
				quantity,
				bean,
				size,
				price,
				grinded,
				status,
				description,
				photo,
			} = req.body;

			const newProduct = await Product.create({
				blend_id,
				product_name,
				quantity,
				bean,
				size,
				price,
				grinded,
				status,
				description,
				photo,
			});

			return res
				.response({
					message: "Product created successfully",
					product: newProduct,
				})
				.code(201);
		} catch (err) {
			console.error("Error creating product:", err);
			return h.response({ message: "Error creating product" }).code(500);
		}
	},

	getAllProducts: async (request, h) => {
		try {
			const { bean } = request.query;
			if (bean) {
				const products = await Product.findAll({
					where: { bean: bean === "true" },
				});
				return h.response(products).code(200);
			}
			const products = await Product.findAll();

			return h.response(products).code(200);
		} catch (err) {
			console.error("Error fetching products:", err);
			return h.response({ message: "Error fetching products" }).code(500);
		}
	},

	getProductsByStatus: async (request, h) => {
		const { status } = req.params;

		try {
			const products = await Product.findAll({
				where: { status },
			});

			return h.response(products).code(200);
		} catch (err) {
			console.error("Error fetching products by status:", err);
			return res
				.code(500)
				.response({ message: "Error fetching products by status" });
		}
	},

	getProductById: async (request, h) => {
		const productId = req.params.id;

		try {
			const product = await Product.findByPk(productId);

			if (!product) {
				return h.response({ message: "Product not found" }).code(404);
			}

			return h.response(product).code(200);
		} catch (err) {
			console.error("Error fetching product:", err);
			return h.response({ message: "Error fetching product" }).code(500);
		}
	},

	updateProduct: async (request, h) => {
		const productId = req.params.id;
		const {
			blend_id,
			product_name,
			quantity,
			bean,
			size,
			price,
			grinded,
			status,
			description,
			photo,
		} = req.body;

		try {
			const product = await Product.findByPk(productId);

			if (!product) {
				return h.response({ message: "Product not found" }).code(404);
			}

			product.blend_id = blend_id;
			product.product_name = product_name;
			product.quantity = quantity;
			product.bean = bean;
			product.size = size;
			product.price = price;
			product.grinded = grinded;
			product.status = status;
			product.description = description;
			product.photo = photo;

			await product.save();

			return res
				.response({ message: "Product updated successfully", product })
				.code(200);
		} catch (err) {
			console.error("Error updating product:", err);
			return h.response({ message: "Error updating product" }).code(500);
		}
	},

	deleteProduct: async (request, h) => {
		const productId = req.params.id;

		try {
			const product = await Product.findByPk(productId);

			if (!product) {
				return h.response({ message: "Product not found" }).code(404);
			}

			await product.destroy();

			return h.response({ message: "Product deleted successfully" }).code(200);
		} catch (err) {
			console.error("Error deleting product:", err);
			return h.response({ message: "Error deleting product" }).code(500);
		}
	},
};

module.exports = ProductController;
