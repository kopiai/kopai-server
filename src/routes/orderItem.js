const OrderItemController = require('../controllers/orderItem'); 

const orderItemRoutes = [
    {
        method: 'POST',
        path: '/orders/{{order_id}}/items',
        handler: OrderItemController.createOrderItem
    },
    {
        method: 'DELETE',
        path: '/orders/{{order_id}}/items/{{orderItem_id}}',
        handler: OrderItemController.deleteOrderItem
    }
];

module.exports = orderItemRoutes;
