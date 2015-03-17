var Promise = require('bluebird'),
    request = Promise.promisify(require('request')),
    config = require('config');

module.exports = function(query) {
    var key = config.geocoder.key,
        url = 'https://maps.googleapis.com/maps/api/geocode/json';

    return request({ uri: url, qs: { address: query, key: key }, json: true})
        .spread(function(res, body) {
            return body;
        });
};
