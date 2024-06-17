const ProductController = require("../controllers/productController");

module.exports = [
	{
		method: "POST",
		path: "/products",
		handler: ProductController.createProduct,
	},
	{
		method: "GET",
		path: "/products",
		handler: ProductController.getAllProducts,
	},
	{
		method: "GET",
		path: "/products/{productID}",
		handler: ProductController.getProductById,
	},
	{
		method: "PUT",
		path: "/products/{productID}",
		handler: ProductController.updateProduct,
	},
	{
		method: "DELETE",
		path: "/products",
		handler: ProductController.deleteProduct,
	},
];
