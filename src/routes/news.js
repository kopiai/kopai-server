const NewsController = require("../controllers/newsController");

const routes = [
	{
		method: "GET",
		path: "/news",
		handler: NewsController.getAllNews,
	},
	{
		method: "GET",
		path: "/news/{news_id}",
		handler: NewsController.getNewsById,
	},
	{
		method: "POST",
		path: "/news",
		handler: NewsController.addNews,
	},
	{
		method: "PUT",
		path: "/news/{news_id}",
		handler: NewsController.updateNews,
	},
	{
		method: "DELETE",
		path: "/news/{news_id}",
		handler: NewsController.deleteNews,
	},
];

module.exports = routes;
