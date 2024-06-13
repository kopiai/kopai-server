const { Sequelize, DataTypes } = require('sequelize');
const databaseConfig = require('../config/database'); // Correct path to database.js

const sequelize = new Sequelize(databaseConfig.database, databaseConfig.username, databaseConfig.password, {
  host: databaseConfig.host,
  dialect: databaseConfig.dialect
});


module.exports = { sequelize };


const User = sequelize.define('users', {
    user_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
    gender: DataTypes.BOOLEAN,
    birth: DataTypes.DATE,
    email: DataTypes.STRING,
    phone: DataTypes.BIGINT, 
    password: DataTypes.STRING,
    address: DataTypes.STRING
}, {
    timestamps: false
});


const RecommendationSystem = sequelize.define('RecommendationSystem', {
    recommend_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: { type: DataTypes.INTEGER, references: { model: User, key: 'user_id' } },
    blend_id: { type: DataTypes.INTEGER },
    coffee_id: { type: DataTypes.INTEGER }
}, {
    timestamps: false
});


const Order = sequelize.define('Order', {
    order_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    date: DataTypes.DATE,
    status: DataTypes.STRING,
    user_id: { type: DataTypes.INTEGER, references: { model: User, key: 'user_id' } }
}, {
    timestamps: false
});


const OrderItem = sequelize.define('OrderItem', {
    orderitem_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    quantity: DataTypes.INTEGER,
    totalPrice: DataTypes.FLOAT,
    order_id: { type: DataTypes.INTEGER, references: { model: Order, key: 'order_id' } },
    product_id: { type: DataTypes.INTEGER },
   blend_id: { type: DataTypes.INTEGER }
}, {
    timestamps: false
});


const Favourites = sequelize.define('Favourites', {
    favourite_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    product_id: { type: DataTypes.INTEGER },
   blend_id: { type: DataTypes.INTEGER },
    user_id: { type: DataTypes.INTEGER, references: { model: User, key: 'user_id' } }
}, {
    timestamps: false
});


const Product = sequelize.define('products', {
    product_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    product_name: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    bean: DataTypes.BOOLEAN,
    size: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    description: DataTypes.STRING,
    photo: DataTypes.STRING
}, {
    timestamps: false
});


const Blend = sequelize.define('Blend', {
    blend_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    coffee_id: { type: DataTypes.INTEGER },
    product_id: { type: DataTypes.INTEGER },
    user_id: { type: DataTypes.INTEGER, references: { model: User, key: 'user_id' } },
    blendName: DataTypes.STRING,
    description: DataTypes.STRING
}, {
    timestamps: false
});


const Coffee = sequelize.define('Coffee', {
    coffee_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    coffeeName: DataTypes.STRING,
    quantity: DataTypes.INTEGER
}, {
    timestamps: false
});


const News = sequelize.define('News', {
    newsID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    newsTitle: DataTypes.STRING,
    newsAuthor: DataTypes.STRING,
    date: DataTypes.DATE,
    description: DataTypes.STRING,
    picture: DataTypes.STRING,
    content: DataTypes.TEXT
}, {
    timestamps: false
});


User.hasMany(Order, { foreignKey: 'user_id' });
Order.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(RecommendationSystem, { foreignKey: 'user_id' });
RecommendationSystem.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(Favourites, { foreignKey: 'user_id' });
Favourites.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(Blend, { foreignKey: 'user_id' });
Blend.belongsTo(User, { foreignKey: 'user_id' });

Order.hasMany(OrderItem, { foreignKey: 'order_id' });
OrderItem.belongsTo(Order, { foreignKey: 'order_id' });


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
    News
};
