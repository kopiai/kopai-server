const { Product } = require('../models');

const ProductController = {
    addProduct: async (request, h) => {
        try {
            const { product_name, quantity, bean, size, price, deskripsi, photo } = request.payload;

            const newProduct = await Product.create({
                product_name,
                quantity,
                bean,
                size,
                price,
                deskripsi,
                photo
            });

            return h.response({ message: 'Product added successfully', product: newProduct }).code(201);
        } catch (err) {
            console.error(err);
            return h.response({ message: 'Error adding product' }).code(500);
        }
    },

    deleteProduct: async (request, h) => {
        try {
            const product_id = request.params.product_id;

            const product = await Product.findByPk(product_id);
            if (!product) {
                return h.response({ message: 'Product not found' }).code(404);
            }

            await product.destroy();

            return h.response({ message: 'Product deleted successfully' }).code(200);
        } catch (err) {
            console.error(err);
            return h.response({ message: 'Error deleting product' }).code(500);
        }
    },

    viewProductDetails: async (request, h) => {
        try {
            const product_id = request.params.product_id;

            const product = await Product.findByPk(product_id);
            if (!product) {
                return h.response({ message: 'Product not found' }).code(404);
            }

            return h.response({ productDetails: product }).code(200);
        } catch (err) {
            console.error(err);
            return h.response({ message: 'Error retrieving product details' }).code(500);
        }
    }
};

module.exports = ProductController;
