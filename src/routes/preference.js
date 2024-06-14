const PreferenceController = require('../controllers/preferenceController');

const routes = [
    {
        method: 'GET',
        path: '/preferences',
        handler: PreferenceController.getAllPreferences
    },
    {
        method: 'GET',
        path: '/preferences/{preference_id}',
        handler: PreferenceController.getPreferenceById
    },
    {
        method: 'POST',
        path: '/preferences',
        handler: PreferenceController.addPreference
    },
    {
        method: 'PUT',
        path: '/preferences/{preference_id}',
        handler: PreferenceController.updatePreference
    },
    {
        method: 'DELETE',
        path: '/preferences/{preference_id}',
        handler: PreferenceController.deletePreference
    }
];

module.exports = routes;
