const { Sequelize, DataTypes } = require("sequelize");
const databaseConfig = require("../config/database");

const sequelize = new Sequelize(
	databaseConfig.database,
	databaseConfig.username,
	databaseConfig.password,
	{
		host: databaseConfig.host,
		dialect: databaseConfig.dialect,
	},
);

const User = sequelize.define(
	"User",
	{
		user_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		name: DataTypes.STRING,
		gender: DataTypes.BOOLEAN,
		birth: DataTypes.DATE,
		email: DataTypes.STRING,
		phone: DataTypes.BIGINT,
		password: DataTypes.STRING,
		address: DataTypes.STRING,
		photo: DataTypes.STRING
	},
	{
		timestamps: false,
	},
);

const RecommendationSystem = sequelize.define(
	"RecommendationSystem",
	{
		recommend_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		user_id: {
			type: DataTypes.INTEGER,
			references: { model: "User", key: "user_id" },
		},
		blend_id: { type: DataTypes.INTEGER },
		coffee_id: { type: DataTypes.INTEGER },
	},
	{
		timestamps: false,
	},
);

const Order = sequelize.define(
	"Order",
	{
		order_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		date: DataTypes.DATE,
		status: DataTypes.STRING,
		user_id: {
			type: DataTypes.INTEGER,
			references: { model: "User", key: "user_id" },
		},
	},
	{
		timestamps: false,
	},
);

const OrderItem = sequelize.define(
	"OrderItem",
	{
		orderitem_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		quantity: DataTypes.INTEGER,
		totalPrice: DataTypes.FLOAT,
		order_id: {
			type: DataTypes.INTEGER,
			references: { model: "Order", key: "order_id" },
		},
		product_id: { type: DataTypes.INTEGER },
		blend_id: { type: DataTypes.INTEGER },
	},
	{
		timestamps: false,
	},
);

const Favourites = sequelize.define(
	"Favourites",
	{
		favourite_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		product_id: { type: DataTypes.INTEGER },
		blend_id: { type: DataTypes.INTEGER },
		user_id: {
			type: DataTypes.INTEGER,
			references: { model: "User", key: "user_id" },
		},
	},
	{
		timestamps: false,
	},
);

const Product = sequelize.define(
	"Product",
	{
		product_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		blend_id: { type: DataTypes.INTEGER },
		product_name: DataTypes.STRING,
		quantity: DataTypes.INTEGER,
		bean: DataTypes.BOOLEAN,
		size: DataTypes.INTEGER,
		price: DataTypes.INTEGER,
		grinded: DataTypes.BOOLEAN,
		status: DataTypes.BOOLEAN,
		description: DataTypes.STRING,
		photo: DataTypes.STRING,
	},
	{
		timestamps: false,
	},
);

const Coffee = sequelize.define(
	"Coffee",
	{
		coffee_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		coffee_types: { type: DataTypes.STRING, allowNull: false },
		coffee_name: { type: DataTypes.STRING, allowNull: false },
		place: { type: DataTypes.STRING, allowNull: false },
		acidity: { type: DataTypes.STRING, allowNull: false },
		body: { type: DataTypes.STRING, allowNull: false },
		taste: { type: DataTypes.STRING, allowNull: false },
		price_gram: { type: DataTypes.INTEGER, allowNull: false },
		quantity: { type: DataTypes.INTEGER, allowNull: false },
	},
	{
		timestamps: false,
	},
);

const Roasting = sequelize.define(
	"Roasting",
	{
		roasting_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		roasting_type: { type: DataTypes.STRING, allowNull: false },
		celcius: { type: DataTypes.INTEGER, allowNull: false },
		color: { type: DataTypes.STRING, allowNull: false },
		flavor: { type: DataTypes.STRING, allowNull: false },
		output: { type: DataTypes.STRING, allowNull: false },
	},
	{
		timestamps: false,
	},
);

const Grinding = sequelize.define(
	"Grinding",
	{
		grinding_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		grinding_name: { type: DataTypes.STRING, allowNull: false },
		saranpenyajian: { type: DataTypes.STRING, allowNull: false },
	},
	{
		timestamps: false,
	},
);

const Blend = sequelize.define(
	"Blend",
	{
		blend_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		coffee_id1: {
			type: DataTypes.INTEGER,
			references: { model: "Coffee", key: "coffee_id" },
		},
		coffee_id2: {
			type: DataTypes.INTEGER,
			references: { model: "Coffee", key: "coffee_id" },
		},
		percentage: { type: DataTypes.INTEGER, allowNull: false },
		ukuran_gram: { type: DataTypes.INTEGER, allowNull: false },
		roast_id: {
			type: DataTypes.INTEGER,
			references: { model: "Roasting", key: "roasting_id" },
		},
		grind_id: {
			type: DataTypes.INTEGER,
			references: { model: "Grinding", key: "grinding_id" },
		},
		product_id: {
			type: DataTypes.INTEGER,
			references: { model: "Product", key: "product_id" },
		},
		user_id: {
			type: DataTypes.INTEGER,
			references: { model: "User", key: "user_id" },
		},
		blend_name: { type: DataTypes.STRING, allowNull: false },
		description: { type: DataTypes.STRING, allowNull: true },
	},
	{
		timestamps: false,
	},
);

const News = sequelize.define(
	"News",
	{
		newsID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		newsTitle: DataTypes.STRING,
		newsAuthor: DataTypes.STRING,
		date: DataTypes.DATE,
		description: DataTypes.STRING,
		picture: DataTypes.STRING,
		content: DataTypes.TEXT,
	},
	{
		timestamps: false,
	},
);

const Preference = sequelize.define(
	"Preference",
	{
		preference_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		user_id: {
			type: DataTypes.INTEGER,
			references: { model: "User", key: "user_id" },
		},
		effect: { type: DataTypes.STRING, allowNull: false },
		healthIssue: { type: DataTypes.STRING, allowNull: false },
		preferredAroma: { type: DataTypes.STRING, allowNull: false },
		preferredTaste: { type: DataTypes.STRING, allowNull: false },
	},
	{
		timestamps: false,
	},
);

// Define relationships
User.hasOne(Preference, { foreignKey: "user_id" });
Preference.belongsTo(User, { foreignKey: "user_id" });

User.hasMany(Order, { foreignKey: "user_id" });
Order.belongsTo(User, { foreignKey: "user_id" });

User.hasMany(RecommendationSystem, { foreignKey: "user_id" });
RecommendationSystem.belongsTo(User, { foreignKey: "user_id" });

User.hasMany(Favourites, { foreignKey: "user_id" });
Favourites.belongsTo(User, { foreignKey: "user_id" });

User.hasMany(Blend, { foreignKey: "user_id" });
Blend.belongsTo(User, { foreignKey: "user_id" });

Order.hasMany(OrderItem, { foreignKey: "order_id" });
OrderItem.belongsTo(Order, { foreignKey: "order_id" });

Product.hasMany(OrderItem, { foreignKey: "product_id" });
OrderItem.belongsTo(Product, { foreignKey: "product_id" });

Blend.hasMany(OrderItem, { foreignKey: "blend_id" });
OrderItem.belongsTo(Blend, { foreignKey: "blend_id" });

Coffee.hasMany(Blend, { foreignKey: "coffee_id1", as: "Coffee1" });
Blend.belongsTo(Coffee, { foreignKey: "coffee_id1", as: "Coffee1" });

Coffee.hasMany(Blend, { foreignKey: "coffee_id2", as: "Coffee2" });
Blend.belongsTo(Coffee, { foreignKey: "coffee_id2", as: "Coffee2" });

Roasting.hasMany(Blend, { foreignKey: "roast_id" });
Blend.belongsTo(Roasting, { foreignKey: "roast_id" });

Grinding.hasMany(Blend, { foreignKey: "grind_id" });
Blend.belongsTo(Grinding, { foreignKey: "grind_id" });

Product.hasMany(Blend, { foreignKey: "product_id" });
Blend.belongsTo(Product, { foreignKey: "product_id" });

module.exports = {
	sequelize,
	User,
	RecommendationSystem,
	Order,
	OrderItem,
	Favourites,
	Product,
	Blend,
	Coffee,
	News,
	Preference,
	Grinding,
	Roasting,
};
