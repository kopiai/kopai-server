const Hapi = require('@hapi/hapi');
const RoastingController = require('../controllers/roastingController');

const init = async () => {
    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    server.route([
        {
            method: 'POST',
            path: '/roastings',
            handler: RoastingController.createRoasting
        },
        {
            method: 'GET',
            path: '/roastings',
            handler: RoastingController.getAllRoastings
        },
        {
            method: 'GET',
            path: '/roastings/{id}',
            handler: RoastingController.getRoastingById
        },
        {
            method: 'PUT',
            path: '/roastings/{id}',
            handler: RoastingController.updateRoasting
        },
        {
            method: 'DELETE',
            path: '/roastings/{id}',
            handler: RoastingController.deleteRoasting
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
