const { OrderItem } = require('../models/models'); 

const OrderItemController = {
    createOrderItem: async (request, h) => {
        try {
            const { quantity, totalPrice, order_id, product_id, blend_id } = request.payload;
            const newOrderItem = await OrderItem.create({ quantity, totalPrice, order_id, product_id, blend_id });
            return h.response({ message: 'Order item created successfully', orderItem: newOrderItem }).code(201);
        } catch (err) {
            console.error(err);
            return h.response({ message: 'Error creating order item' }).code(500);
        }
    },

    getOrderItems: async (request, h) => {
        try {
            const orderItems = await OrderItem.findAll();
            return h.response(orderItems).code(200);
        } catch (err) {
            console.error(err);
            return h.response({ message: 'Error fetching order items' }).code(500);
        }
    },

    getOrderItemById: async (request, h) => {
        try {
            const { orderitem_id } = request.params;
            const orderItem = await OrderItem.findByPk(orderitem_id);
            if (!orderItem) {
                return h.response({ message: 'Order item not found' }).code(404);
            }
            return h.response(orderItem).code(200);
        } catch (err) {
            console.error(err);
            return h.response({ message: 'Error fetching order item' }).code(500);
        }
    },

    updateOrderItem: async (request, h) => {
        try {
            const { orderitem_id } = request.params;
            const { quantity, totalPrice, order_id, product_id, blend_id } = request.payload;
            const orderItem = await OrderItem.findByPk(orderitem_id);
            if (!orderItem) {
                return h.response({ message: 'Order item not found' }).code(404);
            }

            orderItem.quantity = quantity || orderItem.quantity;
            orderItem.totalPrice = totalPrice || orderItem.totalPrice;
            orderItem.order_id = order_id || orderItem.order_id;
            orderItem.product_id = product_id || orderItem.product_id;
            orderItem.blend_id = blend_id || orderItem.blend_id;

            await orderItem.save();
            return h.response({ message: 'Order item updated successfully', orderItem }).code(200);
        } catch (err) {
            console.error(err);
            return h.response({ message: 'Error updating order item' }).code(500);
        }
    },

    deleteOrderItem: async (request, h) => {
        try {
            const { orderitem_id } = request.params;
            const orderItem = await OrderItem.findByPk(orderitem_id);
            if (!orderItem) {
                return h.response({ message: 'Order item not found' }).code(404);
            }

            await orderItem.destroy();
            return h.response({ message: 'Order item deleted successfully' }).code(200);
        } catch (err) {
            console.error(err);
            return h.response({ message: 'Error deleting order item' }).code(500);
        }
    }
};

module.exports = OrderItemController;
