var Promise = require('bluebird'),
    request = require('superagent'),
    config = require('config');

module.exports = {

    geocodeAddress: function(query) {
        var key = config.geocoder.key,
            url = 'https://maps.googleapis.com/maps/api/geocode/json';

        return new Promise(function(resolve, reject) {
            request.get(url).query({ address: query, key: key }).end(function(err, res) {
                if (err || res.body.status !== 'OK') {
                    reject(err);
                } else {
                    resolve(res.body.results[0]);
                }
            });
        });
    }

};
