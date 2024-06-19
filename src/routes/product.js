const ProductController = require("../controllers/productController");

module.exports = [
    {
        method: "POST",
        path: "/products/add",
        handler: ProductController.createProduct,
        options: {
            auth: "jwt",
        },
    },
    {
        method: "GET",
        path: "/products",
        handler: ProductController.getAllProducts,
        options: {
            auth: "jwt",
        },
    },
    {
        method: "GET",
        path: "/products/{id}",
        handler: ProductController.getProductById,
        options: {
            auth: "jwt", 
        },
    },
    {
        method: "PUT",
        path: "/products/{id}",
        handler: ProductController.updateProduct,
        options: {
            auth: "jwt", 
        },
    },
    {
        method: "DELETE",
        path: "/products/delete",
        handler: ProductController.deleteProduct,
        options: {
            auth: "jwt", 
        },
    },
];
