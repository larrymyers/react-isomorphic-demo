var Promise = require('bluebird'),
    request = require('superagent'),
    config = require('config');

module.exports = {

    forLatLng: function(lat, lng) {
        var key = config.forecast.key,
            url = 'https://api.forecast.io/forecast/' + key + '/' + lat + ',' + lng;

        return new Promise(function(resolve, reject) {
            request.get(url).end(function(err, res) {
                if (err) {
                    reject(err);
                } else {
                    resolve(res.body);
                }
            });
        });
    }

};
