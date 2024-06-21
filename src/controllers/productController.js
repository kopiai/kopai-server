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

	getAllProducts: async (req, h) => {
		try {
			const { bean, page = 1, pageSize = 5 } = req.query;
	
		   
			const pageNum = parseInt(page, 10);
			const size = parseInt(pageSize, 10);
	
		   
			const offset = (pageNum - 1) * size;
	
		  
			let options = {
				offset: offset,
				limit: size,
			};
	
		   
			if (bean && bean === "true") {
				options.where = { bean: true };
			}
	
		   
			const totalProducts = await Product.count(options.where ? { where: options.where } : {});
	
		   
			const products = await Product.findAll(options);
	
		   
			const totalPages = Math.ceil(totalProducts / size);
	
		   
			return h.response({
				data: products,
				meta: {
					totalProducts,
					totalPages,
					currentPage: pageNum,
					pageSize: size,
				},
			}).code(200);
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
