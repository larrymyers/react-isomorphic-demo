var request = require('request'),
    url = require('url'),
    _ = require('lodash'),
    Q = require('q');

module.exports = ForcastIO;

function ForcastIO(settings) {
    this.key = settings.key;
    this.log = settings.log || stubLogger();

    if (!this.key) {
        throw new Error('API key is required.');
    }
}

_.extend(ForcastIO.prototype, {
    forLatLng: function(lat, lng) {
        var config = _.cloneDeep({
            protocol: 'https',
            host: 'api.forecast.io',
            pathname: '/forecast/'
        });

        config.pathname += this.key + '/' + lat + ',' + lng;

        var requestUrl = url.format(config);

        this.log.debug(requestUrl);

        return Q.nfcall(request.get, requestUrl).then(function(args) {
            return JSON.parse(args[1]);
        });
    }
});

function stubLogger() {
    var stub = {};

    _.each(['debug', 'info', 'warn', 'error'], function(level) {
        stub[level] = function() {};
    });

    return stub;
}
