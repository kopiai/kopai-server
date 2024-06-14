const { News } = require('../models/models'); 

const NewsController = {
    getAllNews: async (request, h) => {
        try {
            const news = await News.findAll();
            return h.response(news).code(200);
        } catch (err) {
            console.error('Error fetching news:', err);
            return h.response({ message: 'Error fetching news' }).code(500);
        }
    },

    getNewsById: async (request, h) => {
        try {
            const { id } = request.params;
            const news = await News.findByPk(id);
            if (!news) {
                return h.response({ message: 'News not found' }).code(404);
            }
            return h.response(news).code(200);
        } catch (err) {
            console.error('Error fetching news:', err);
            return h.response({ message: 'Error fetching news' }).code(500);
        }
    },

    addNews: async (request, h) => {
        try {
            const { newsTitle, newsAuthor, date, description, picture, content } = request.payload;
            const newNews = await News.create({
                newsTitle,
                newsAuthor,
                date,
                description,
                picture,
                content
            });
            return h.response({ message: 'News added successfully', news: newNews }).code(201);
        } catch (err) {
            console.error('Error adding news:', err);
            return h.response({ message: 'Error adding news' }).code(500);
        }
    },

    updateNews: async (request, h) => {
        try {
            const { id } = request.params;
            const { newsTitle, newsAuthor, date, description, picture, content } = request.payload;

            const news = await News.findByPk(id);
            if (!news) {
                return h.response({ message: 'News not found' }).code(404);
            }

            news.newsTitle = newsTitle;
            news.newsAuthor = newsAuthor;
            news.date = date;
            news.description = description;
            news.picture = picture;
            news.content = content;
            await news.save();

            return h.response({ message: 'News updated successfully', news }).code(200);
        } catch (err) {
            console.error('Error updating news:', err);
            return h.response({ message: 'Error updating news' }).code(500);
        }
    },

    deleteNews: async (request, h) => {
        try {
            const { id } = request.params;

            const news = await News.findByPk(id);
            if (!news) {
                return h.response({ message: 'News not found' }).code(404);
            }

            await news.destroy();

            return h.response({ message: 'News deleted successfully' }).code(200);
        } catch (err) {
            console.error('Error deleting news:', err);
            return h.response({ message: 'Error deleting news' }).code(500);
        }
    }
};

module.exports = NewsController;
