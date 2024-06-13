const PreferenceController = require('../controllers/preference');

const routes = [
    {
        method: 'GET',
        path: '/preferences',
        handler: PreferenceController.getAllPreferences
    },
    {
        method: 'GET',
        path: '/preferences/{id}',
        handler: PreferenceController.getPreferenceById
    },
    {
        method: 'POST',
        path: '/preferences',
        handler: PreferenceController.addPreference
    },
    {
        method: 'PUT',
        path: '/preferences/{id}',
        handler: PreferenceController.updatePreference
    },
    {
        method: 'DELETE',
        path: '/preferences/{id}',
        handler: PreferenceController.deletePreference
    }
];

module.exports = routes;
