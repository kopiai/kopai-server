require('dotenv').config();
const Hapi = require('@hapi/hapi');
const { Sequelize } = require('sequelize');
const databaseConfig = require('./config/database');
const UserController = require('./controllers/user');
const ProductController = require('./controllers/product');
const OrderController = require('./controllers/order');


const sequelize = new Sequelize(databaseConfig);


const init = async () => {
    const server = Hapi.server({
        port: process.env.PORT || 3000,
        host: process.env.HOST || 'localhost'
    });

    try {
        await sequelize.authenticate();
        console.log('Database connected successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }

    server.route([
        {
            method: 'POST',
            path: '/users/register',
            handler: UserController.register
        },
        {
            method: 'POST',
            path: '/users/login',
            handler: UserController.login
        },
        {
            method: 'PUT',
            path: '/users/update',
            handler: UserController.update
        },
        {
            method: 'POST',
            path: '/products/add',
            handler: ProductController.addProduct
        },
        {
            method: 'DELETE',
            path: '/products/delete',
            handler: ProductController.deleteProduct
        },
        {
            method: 'GET',
            path: '/products/{productID}',
            handler: ProductController.viewProductDetails
        },
        {
            method: 'POST',
            path: '/orders',
            handler: OrderController.createOrder
        },
        {
            method: 'PUT',
            path: '/orders/{orderID}',
            handler: OrderController.updateOrder
        },
        {
            method: 'DELETE',
            path: '/orders/{orderID}',
            handler: OrderController.cancelOrder
        }
    ]);

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();
