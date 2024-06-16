const ProductController = require("../controllers/product");

module.exports = [
	{
		method: "POST",
		path: "/products/add",
		handler: ProductController.addProduct,
	},
	{
		method: "DELETE",
		path: "/products/delete",
		handler: ProductController.deleteProduct,
	},
	{
		method: "GET",
		path: "/products/{productID}",
		handler: ProductController.viewProductDetails,
	},
];
