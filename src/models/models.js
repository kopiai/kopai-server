const { Sequelize, DataTypes } = require('sequelize');


const sequelize = new Sequelize('database_name', 'username', 'password', {
    host: 'localhost',
    dialect: 'mysql'
});


const User = sequelize.define('User', {
    userID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
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
    recommendID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userID: { type: DataTypes.INTEGER, references: { model: User, key: 'userID' } },
    blendID: { type: DataTypes.INTEGER },
    coffeeID: { type: DataTypes.INTEGER }
}, {
    timestamps: false
});


const Order = sequelize.define('Order', {
    orderID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    date: DataTypes.DATE,
    status: DataTypes.STRING,
    userID: { type: DataTypes.INTEGER, references: { model: User, key: 'userID' } }
}, {
    timestamps: false
});


const OrderItem = sequelize.define('OrderItem', {
    orderItemID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    quantity: DataTypes.INTEGER,
    totalPrice: DataTypes.FLOAT,
    orderID: { type: DataTypes.INTEGER, references: { model: Order, key: 'orderID' } },
    productID: { type: DataTypes.INTEGER },
    blendID: { type: DataTypes.INTEGER }
}, {
    timestamps: false
});


const Favourites = sequelize.define('Favourites', {
    favouriteID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    productID: { type: DataTypes.INTEGER },
    blendID: { type: DataTypes.INTEGER },
    userID: { type: DataTypes.INTEGER, references: { model: User, key: 'userID' } }
}, {
    timestamps: false
});


const Product = sequelize.define('Product', {
    productID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
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
    blendID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    coffeeID: { type: DataTypes.INTEGER },
    productID: { type: DataTypes.INTEGER },
    userID: { type: DataTypes.INTEGER, references: { model: User, key: 'userID' } },
    blendName: DataTypes.STRING,
    description: DataTypes.STRING
}, {
    timestamps: false
});


const Coffee = sequelize.define('Coffee', {
    coffeeID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
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


User.hasMany(Order, { foreignKey: 'userID' });
Order.belongsTo(User, { foreignKey: 'userID' });

User.hasMany(RecommendationSystem, { foreignKey: 'userID' });
RecommendationSystem.belongsTo(User, { foreignKey: 'userID' });

User.hasMany(Favourites, { foreignKey: 'userID' });
Favourites.belongsTo(User, { foreignKey: 'userID' });

User.hasMany(Blend, { foreignKey: 'userID' });
Blend.belongsTo(User, { foreignKey: 'userID' });

Order.hasMany(OrderItem, { foreignKey: 'orderID' });
OrderItem.belongsTo(Order, { foreignKey: 'orderID' });


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
