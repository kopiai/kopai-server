require("dotenv").config();
const Hapi = require("@hapi/hapi");
const { Sequelize } = require("sequelize");
const databaseConfig = require("./config/database");
const UserController = require("./controllers/userController");
const ProductController = require("./controllers/productController");
const OrderController = require("./controllers/orderController");
const OrderItemController = require("./controllers/orderItemController");
const BlendController = require("./controllers/blendController");
const CoffeeController = require("./controllers/coffeeController");
const NewsController = require("./controllers/newsController");
const PreferenceController = require("./controllers/preferenceController");
const RoastingController = require("./controllers/roastingController");
const GrindingController = require("./controllers/grindingController");

const sequelize = new Sequelize(databaseConfig);

const init = async () => {
	const server = Hapi.server({
		port: process.env.PORT || 3000,
		host: process.env.HOST || "0.0.0.0",
	});

	try {
		await sequelize.authenticate();
		console.log("Database connected successfully.");
	} catch (error) {
		console.error("Unable to connect to the database:", error);
	}

	server.route([
		{
			method: "POST",
			path: "/users/register",
			handler: UserController.register,
		},
		{
			method: "POST",
			path: "/users/login",
			handler: UserController.login,
		},
		{
			method: "PUT",
			path: "/users/update",
			handler: UserController.update,
		},
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
			path: "/products",
			handler: ProductController.viewProductDetails,
		},
		{
			method: "POST",
			path: "/orders",
			handler: OrderController.createOrder,
		},
		{
			method: "PUT",
			path: "/orders/{orderId}",
			handler: OrderController.updateOrder,
		},
		{
			method: "DELETE",
			path: "/orders/{orderId}",
			handler: OrderController.cancelOrder,
		},
		{
			method: "POST",
			path: "/orders/{orderId}/items",
			handler: OrderItemController.createOrderItem,
		},
		{
			method: "DELETE",
			path: "/orders/{orderId}/items/{orderItemId}",
			handler: OrderItemController.deleteOrderItem,
		},
		{
			method: "GET",
			path: "/blends/{blendId}",
			handler: BlendController.getBlendById,
		},
		{
			method: "POST",
			path: "/blends/add",
			handler: BlendController.createBlend,
		},
		{
			method: "PUT",
			path: "/blends/{blendId}",
			handler: BlendController.updateBlend,
		},
		{
			method: "DELETE",
			path: "/blends/{blendId}",
			handler: BlendController.deleteBlend,
		},
		{
			method: "GET",
			path: "/coffees",
			handler: CoffeeController.getAllCoffees,
		},
		{
			method: "GET",
			path: "/blends/{blendId}/coffee",
			handler: CoffeeController.getCoffeeById,
		},
		{
			method: "POST",
			path: "/coffee/add",
			handler: CoffeeController.addCoffee,
		},
		{
			method: "PUT",
			path: "/coffees/{id}",
			handler: CoffeeController.updateCoffee,
		},
		{
			method: "DELETE",
			path: "/coffee/delete/{coffeeId}",
			handler: CoffeeController.deleteCoffee,
		},
		{
			method: "GET",
			path: "/news",
			handler: NewsController.getAllNews,
		},
		{
			method: "GET",
			path: "/news/{newsId}",
			handler: NewsController.getNewsById,
		},
		{
			method: "POST",
			path: "/news",
			handler: NewsController.addNews,
		},
		{
			method: "PUT",
			path: "/news/{newsId}",
			handler: NewsController.updateNews,
		},
		{
			method: "DELETE",
			path: "/news/{newsId}",
			handler: NewsController.deleteNews,
		},
		{
			method: "GET",
			path: "/preferences",
			handler: PreferenceController.getAllPreferences,
		},
		{
			method: "GET",
			path: "/preferences/{preferenceId}",
			handler: PreferenceController.getPreferenceById,
		},
		{
			method: "POST",
			path: "/preferences",
			handler: PreferenceController.addPreference,
		},
		{
			method: "PUT",
			path: "/preferences/{preferenceId}",
			handler: PreferenceController.updatePreference,
		},
		{
			method: "DELETE",
			path: "/preferences/{preferenceId}",
			handler: PreferenceController.deletePreference,
		},
		{
			method: "POST",
			path: "/roastings",
			handler: RoastingController.createRoasting,
		},
		{
			method: "GET",
			path: "/roastings",
			handler: RoastingController.getAllRoastings,
		},
		{
			method: "GET",
			path: "/roastings/{id}",
			handler: RoastingController.getRoastingById,
		},
		{
			method: "PUT",
			path: "/roastings/{id}",
			handler: RoastingController.updateRoasting,
		},
		{
			method: "DELETE",
			path: "/roastings/{id}",
			handler: RoastingController.deleteRoasting,
		},
		{
			method: "POST",
			path: "/grindings",
			handler: GrindingController.createGrinding,
		},
		{
			method: "GET",
			path: "/grindings",
			handler: GrindingController.getAllGrindings,
		},
		{
			method: "GET",
			path: "/grindings/{id}",
			handler: GrindingController.getGrindingById,
		},
		{
			method: "PUT",
			path: "/grindings/{id}",
			handler: GrindingController.updateGrinding,
		},
		{
			method: "DELETE",
			path: "/grindings/{id}",
			handler: GrindingController.deleteGrinding,
		},
	]);

	try {
		await server.start();
		console.log("Server running on %s", server.info.uri);
	} catch (error) {
		console.error("Error starting server:", error);
	}
};

process.on("unhandledRejection", (err) => {
	console.log(err);
	process.exit(1);
});

init();
