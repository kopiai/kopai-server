const RecommendationController = {
	generateRecommendations: async (request, h) => {
		return h.response({ message: "Recommendations generated" }).code(200);
	},
	getRecommendationDetails: async (request, h) => {
		const recommendID = request.params.recommendID;

		return h.response({ recommendationDetails: {} }).code(200);
	},
};

module.exports = RecommendationController;
