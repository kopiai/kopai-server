const OrderController = require("../controllers/order");

module.exports = [
	{
		method: "POST",
		path: "/orders/create",
		handler: OrderController.createOrder,
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
