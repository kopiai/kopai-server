const OrderController = require("../controllers/orderController");

module.exports = [
	{
		method: "POST",
		path: "/orders/create",
		handler: OrderController.createOrder,
	},
	{
		method: "GET",
		path: "/orders",
		handler: OrderController.getAllOrders,
	},
	{
		method: "GET",
		path: "/orders/{order_id}",
		handler: OrderController.getOrderById,
	},
	{
		method: "PUT",
		path: "/orders/update",
		handler: OrderController.updateOrder,
	},
	{
		method: "DELETE",
		path: "/orders/cancel",
		handler: OrderController.cancelOrder,
	},
];
