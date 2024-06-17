const Hapi = require('@hapi/hapi');
const GrindingController = require('../controllers/grindingController');

const init = async () => {
    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    server.route([
        {
            method: 'POST',
            path: '/grindings',
            handler: GrindingController.createGrinding
        },
        {
            method: 'GET',
            path: '/grindings',
            handler: GrindingController.getAllGrindings
        },
        {
            method: 'GET',
            path: '/grindings/{id}',
            handler: GrindingController.getGrindingById
        },
        {
            method: 'PUT',
            path: '/grindings/{id}',
            handler: GrindingController.updateGrinding
        },
        {
            method: 'DELETE',
            path: '/grindings/{id}',
            handler: GrindingController.deleteGrinding
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
