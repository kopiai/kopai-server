require('dotenv').config();
const Hapi = require('@hapi/hapi');
const sequelize = require('./config/database');
const UserController = require('./controllers/UserController');
const ProductController = require('./controllers/ProductController');
const OrderController = require('./controllers/OrderController');

const init = async () => {
    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
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
            path: '/register',
            handler: UserController.register
        },
        {
            method: 'POST',
            path: '/login',
            handler: UserController.login
        },
        {
            method: 'PUT',
            path: '/update',
            handler: UserController.update
        },
        {
            method: 'POST',
            path: '/product',
            handler: ProductController.addProduct
        },
        {
            method: 'DELETE',
            path: '/product/{productID}',
            handler: ProductController.deleteProduct
        },
        {
            method: 'GET',
            path: '/product/{productID}',
            handler: ProductController.viewProductDetails
        },
        {
            method: 'POST',
            path: '/order',
            handler: OrderController.createOrder
        },
        {
            method: 'PUT',
            path: '/order',
            handler: OrderController.updateOrder
        },
        {
            method: 'DELETE',
            path: '/order',
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
