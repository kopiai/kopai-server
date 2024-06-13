require('dotenv').config();
const Hapi = require('@hapi/hapi');
const { Sequelize } = require('sequelize'); 
const databaseConfig = require('./config/database'); 
const UserController = require('./controllers/user'); 
const ProductController = require('./controllers/product'); 
const OrderController = require('./controllers/order');
const OrderItemController = require('./controllers/orderItem'); 
const BlendController = require('./controllers/blend');
const CoffeeController = require('./controllers/coffee');

const sequelize = new Sequelize(databaseConfig);

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
            path: '/products/',
            handler: ProductController.viewProductDetails
        },
        {
            method: 'POST',
            path: '/orders',
            handler: OrderController.createOrder
        },
        {
            method: 'PUT',
            path: '/orders/',
            handler: OrderController.updateOrder
        },
        {
            method: 'DELETE',
            path: '/orders/',
            handler: OrderController.cancelOrder
        },
        {
            method: 'POST',
            path: '/orders/{order_id}/items',
            handler: OrderItemController.createOrderItem
        },
        {
            method: 'DELETE',
            path: '/orders/{order_id}/items/{orderItem_id}',
            handler: OrderItemController.deleteOrderItem
        },
        {
            method: 'GET',
            path: '/blends/{blend_id}',
            handler: BlendController.getBlendById
        },
        {
            method: 'POST',
            path: '/blends/add',
            handler: BlendController.createBlend
        },
        {
            method: 'PUT',
            path: '/blends/{blend_id}',
            handler: BlendController.updateBlend
        },
        {
            method: 'DELETE',
            path: '/blends/{blend_id}',
            handler: BlendController.deleteBlend
        },
        {
            method: 'GET',
            path: '/coffees',
            handler: CoffeeController.getAllCoffees
        },
        {
            method: 'GET',
            path: '/blends/{blend_id}/coffee',
            handler: CoffeeController.getCoffeeById
        },
        {
            method: 'POST',
            path: '/coffee/add',
            handler: CoffeeController.addCoffee
        },
        {
            method: 'PUT',
            path: '/coffees/{id}',
            handler: CoffeeController.updateCoffee
        },
        {
            method: 'DELETE',
            path: '/coffee/delete/{coffee_id}',
            handler: CoffeeController.deleteCoffee
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
