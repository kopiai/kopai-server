const RecommendationController = require('../controllers/recommendationSystem');

module.exports = [
    {
        method: 'GET',
        path: '/recommendations/generate',
        handler: RecommendationController.generateRecommendations
    },
    {
        method: 'GET',
        path: '/recommendations/{recommendID}',
        handler: RecommendationController.getRecommendationDetails
    }
];
