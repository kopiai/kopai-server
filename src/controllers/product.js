const ProductController = {
    addProduct: async (request, h) => {
        
        return h.response({ message: 'Product added successfully' }).code(201);
    },
    deleteProduct: async (request, h) => {
       
        return h.response({ message: 'Product deleted successfully' }).code(200);
    },
    viewProductDetails: async (request, h) => {
        const productID = request.params.productID;
        
        return h.response({ productDetails: {} }).code(200);
    }
};

module.exports = ProductController;
