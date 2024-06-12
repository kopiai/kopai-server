const { Order, OrderItem } = require('../models'); 

const OrderController = {
    createOrder: async (request, h) => {
        try {
            const { userID, orderItems, status } = request.payload; 
            const newOrder = await Order.create({
                userID,
                date: new Date(),
                status: status || 'Pending' 
            });

            const createdOrderItems = await Promise.all(orderItems.map(async item => {
                return await OrderItem.create({
                    orderID: newOrder.orderID,
                    productID: item.productID,
                    blendID: item.blendID,
                    quantity: item.quantity,
                    totalPrice: item.totalPrice
                });
            }));

            return h.response({ message: 'Order created successfully', order: newOrder, orderItems: createdOrderItems }).code(201);
        } catch (err) {
            console.error(err);
            return h.response({ message: 'Error creating order' }).code(500);
        }
    },

    updateOrder: async (request, h) => {
        try {
            const { orderID, status } = request.payload;

            const order = await Order.findByPk(orderID);
            if (!order) {
                return h.response({ message: 'Order not found' }).code(404);
            }

            order.status = status || order.status;
            await order.save();

            return h.response({ message: 'Order updated successfully', order }).code(200);
        } catch (err) {
            console.error(err);
            return h.response({ message: 'Error updating order' }).code(500);
        }
    },

    cancelOrder: async (request, h) => {
        try {
            const { orderID } = request.payload;

            const order = await Order.findByPk(orderID);
            if (!order) {
                return h.response({ message: 'Order not found' }).code(404);
            }

            order.status = 'Cancelled';
            await order.save();

            return h.response({ message: 'Order cancelled successfully', order }).code(200);
        } catch (err) {
            console.error(err);
            return h.response({ message: 'Error cancelling order' }).code(500);
        }
    }
};

module.exports = OrderController;
