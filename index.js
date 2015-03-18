var express = require('express'),
    cheerio = require('cheerio'),
    config = require('config'),
    fs = require('fs'),
    path = require('path'),
    webpackDevMiddleware = require('webpack-dev-middleware'),
    webpack = require("webpack"),
    webpackConfig = require('./webpack.config'),
    geocoder = require('./lib/geocoder'),
    forecast = require('./lib/forecast-io');

var isDev = config.util.getEnv('NODE_ENV') === 'development',
    app = express();

function renderPage(res, data) {
    fs.readFile(path.resolve('./public/index.html'), 'utf8', function(err, html) {
        var $ = cheerio.load(html);
        $('#app-data').text('APP_DATA=' + JSON.stringify(data));
        res.send($.html());
    });
}

function getForecastForLocation(address) {
    var data = {};

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

app.get('/', function(req, res) {
    if (req.query.address) {
        getForecastForLocation(req.query.address)
            .then(function(data) {
                renderPage(res, data);
            });
    } else {
        renderPage(res, {});
    }
});

app.get('/api/forecast', function(req, res) {
    getForecastForLocation(req.query.address)
        .then(function(data) {
            res.json(data);
        })
        .catch(function(err) {
            res.status(500).json(err);
        });
});

if (isDev) {
    webpackConfig.devtool = 'eval';

    app.use(webpackDevMiddleware(webpack(webpackConfig), {
        stats: false
    }));
}

app.use(express.static(path.resolve('./public')));

module.exports = app;
