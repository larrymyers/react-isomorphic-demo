require('node-jsx').install({ extension: '.jsx' });

var express = require('express'),
    cheerio = require('cheerio'),
    Promise = require('bluebird'),
    fs = require('fs'),
    path = require('path'),
    geocoder = require('./lib/geocoder'),
    forecast = require('./lib/forecast-io'),
    React = require('react'),
    Root = React.createFactory(require('./app/root.jsx'));

var app = express();

/**
 * Inserts the html markup and json representation of the given data
 * for the React application. Cheerio is used here to demonstrate
 * that you don't need a template language to do server side rendering.
 *
 * @param {Response} res  the express response
 * @param {Object} data  app data to serialize
 */
function renderPage(res, data) {
    fs.readFile(path.resolve('./public/index.html'), 'utf8', function(err, html) {
        var $ = cheerio.load(html);
        $('#root').html(React.renderToString(Root(data)));
        $('#app-data').text('APP_DATA=' + JSON.stringify(data));
        res.send($.html());
    });
}

/**
 * A simple unified service that returns both the geocoded
 * address and the weather forecast.
 *
 * @param {string} address
 * @returns {Promise}
 */
function getForecastForLocation(address) {
    var data = {};

    if (!address || address.length === 0) {
        return Promise.resolve(data);
    }

    return geocoder.geocodeAddress(address)
        .then(function(resp) {
            var latlng = resp.geometry.location;
            data.location = resp;
            return forecast.forLatLng(latlng.lat, latlng.lng);
        })
        .then(function(resp) {
            data.forecast = resp;
            return data;
        });
}

/**
 * The Page and API endpoints for the application. Note
 * that both are almost identical, they are just different
 * representations of the same service call.
 */

app.get('/', function indexHandler(req, res) {
    getForecastForLocation(req.query.address )
        .then(function(data) {
            renderPage(res, data);
        })
        .catch(function(err) {
            res.status(500).send('./public/500.html');
        });
});

app.get('/api/forecast', function getForecastHandler(req, res) {
    getForecastForLocation(req.query.address)
        .then(function(data) {
            res.json(data);
        })
        .catch(function(err) {
            res.status(500).json(err);
        });
});

module.exports = app;
