const ProductController = require("../controllers/productController");

module.exports = [
	{
		method: "POST",
		path: "/products/add",
		handler: ProductController.createProduct,
	},
	{
		method: "GET",
		path: "/products",
		handler: ProductController.getAllProducts,
	},
	{
		method: "GET",
		path: "/products/{id}",
		handler: ProductController.getProductById,
	},
	{
		method: "PUT",
		path: "/products/{id}",
		handler: ProductController.updateProduct,
	},
	{
		method: "DELETE",
		path: "/products/delete",
		handler: ProductController.deleteProduct,
	},
];
