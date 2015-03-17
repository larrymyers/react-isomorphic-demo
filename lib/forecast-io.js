var Promise = require('bluebird'),
    request = Promise.promisify(require('request')),
    config = require('config');

module.exports = {
    forLatLng: function(lat, lng) {
        var key = config.forecast.key,
            url = 'https://api.forecast.io/forecast/' + key + '/' + lat + ',' + lng;

        return request({ uri: url, json: true }).spread(function(res, body) {
            return body;
        });
    }
};
