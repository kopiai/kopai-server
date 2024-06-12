require('dotenv').config();
const Hapi = require('@hapi/hapi');
const { Sequelize } = require('sequelize'); // Assuming you're using Sequelize for the database
const databaseConfig = require('./config/database'); // Relative path to the config file
const UserController = require('./controllers/user'); // Assuming the controller is in a controllers directory
const ProductController = require('./controllers/product'); // Same as above
const OrderController = require('./controllers/order'); // Same as above

// Initialize Sequelize with your database configuration
const sequelize = new Sequelize(databaseConfig);

// Function to initialize the server
const init = async () => {
    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    // Try to authenticate with the database
    try {
        await sequelize.authenticate();
        console.log('Database connected successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }

    // Define server routes
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

    // Start the server
    await server.start();
    console.log('Server running on %s', server.info.uri);
};

// Handle unhandled rejections
process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

// Initialize the server
init();
