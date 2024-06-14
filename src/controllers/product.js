const { Product } = require('../models/models');

const ProductController = {
  createProduct: async (req, res) => {
    try {
      const { blend_id, product_name, quantity, bean, size, price, grinded, status, description, photo } = req.body;

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
        photo
      });

      return res.status(201).json({ message: 'Product created successfully', product: newProduct });
    } catch (err) {
      console.error('Error creating product:', err);
      return res.status(500).json({ message: 'Error creating product' });
    }
  },

  getAllProducts: async (req, res) => {
    try {
      const products = await Product.findAll();

      return res.status(200).json(products);
    } catch (err) {
      console.error('Error fetching products:', err);
      return res.status(500).json({ message: 'Error fetching products' });
    }
  },


  getProductById: async (req, res) => {
    const productId = req.params.id;

    try {
      const product = await Product.findByPk(productId);

      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }

      return res.status(200).json(product);
    } catch (err) {
      console.error('Error fetching product:', err);
      return res.status(500).json({ message: 'Error fetching product' });
    }
  },

  updateProduct: async (req, res) => {
    const productId = req.params.id;
    const { blend_id, product_name, quantity, bean, size, price, grinded, status, description, photo } = req.body;

    try {
      const product = await Product.findByPk(productId);

      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
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

      return res.status(200).json({ message: 'Product updated successfully', product });
    } catch (err) {
      console.error('Error updating product:', err);
      return res.status(500).json({ message: 'Error updating product' });
    }
  },

  deleteProduct: async (req, res) => {
    const productId = req.params.id;

    try {
      const product = await Product.findByPk(productId);

      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }

      await product.destroy();

      return res.status(200).json({ message: 'Product deleted successfully' });
    } catch (err) {
      console.error('Error deleting product:', err);
      return res.status(500).json({ message: 'Error deleting product' });
    }
  }
};

module.exports = ProductController;
