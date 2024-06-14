const { Preference } = require('../models/models'); 

const PreferenceController = {
    getAllPreferences: async (request, h) => {
        try {
            const preferences = await Preference.findAll();
            return h.response(preferences).code(200);
        } catch (err) {
            console.error('Error fetching preferences:', err);
            return h.response({ message: 'Error fetching preferences' }).code(500);
        }
    },

    getPreferenceById: async (request, h) => {
        try {
            const { id } = request.params;
            const preference = await Preference.findByPk(id);
            if (!preference) {
                return h.response({ message: 'Preference not found' }).code(404);
            }
            return h.response(preference).code(200);
        } catch (err) {
            console.error('Error fetching preference:', err);
            return h.response({ message: 'Error fetching preference' }).code(500);
        }
    },

    addPreference: async (request, h) => {
        try {
            const { user_id, effect, healthIssue, preferredAroma, preferredTaste } = request.payload;
            const newPreference = await Preference.create({
                user_id,
                effect,
                healthIssue,
                preferredAroma,
                preferredTaste
            });
            return h.response({ message: 'Preference added successfully', preference: newPreference }).code(201);
        } catch (err) {
            console.error('Error adding preference:', err);
            return h.response({ message: 'Error adding preference' }).code(500);
        }
    },

    updatePreference: async (request, h) => {
        try {
            const { id } = request.params;
            const { user_id, effect, healthIssue, preferredAroma, preferredTaste } = request.payload;

            const preference = await Preference.findByPk(id);
            if (!preference) {
                return h.response({ message: 'Preference not found' }).code(404);
            }

            preference.user_id = user_id;
            preference.effect = effect;
            preference.healthIssue = healthIssue;
            preference.preferredAroma = preferredAroma;
            preference.preferredTaste = preferredTaste;
            await preference.save();

            return h.response({ message: 'Preference updated successfully', preference }).code(200);
        } catch (err) {
            console.error('Error updating preference:', err);
            return h.response({ message: 'Error updating preference' }).code(500);
        }
    },

    deletePreference: async (request, h) => {
        try {
            const { id } = request.params;

            const preference = await Preference.findByPk(id);
            if (!preference) {
                return h.response({ message: 'Preference not found' }).code(404);
            }

            await preference.destroy();

            return h.response({ message: 'Preference deleted successfully' }).code(200);
        } catch (err) {
            console.error('Error deleting preference:', err);
            return h.response({ message: 'Error deleting preference' }).code(500);
        }
    }
};

module.exports = PreferenceController;
