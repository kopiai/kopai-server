const Hapi = require('@hapi/hapi');
const userRoutes = require('./routes/user');
const recommendationRoutes = require('./routes/recommendationSystem');
const orderRoutes = require('./routes/order');
const productRoutes = require('./routes/product');

const init = async () => {
    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    server.route(userRoutes);
    server.route(recommendationRoutes);
    server.route(orderRoutes);
    server.route(productRoutes);
    // Routes Lainnya

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();
