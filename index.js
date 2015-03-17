require('babel/register');

var express = require('express'),
    cheerio = require('cheerio'),
    config = require('config'),
    fs = require('fs'),
    path = require('path'),
    webpackDevMiddleware = require("webpack-dev-middleware"),
    webpack = require("webpack"),
    webpackConfig = require('./webpack.config'),
    geocoder = require('./lib/geocoder'),
    forecast = require('./lib/forecast-io');

var isDev = config.util.getEnv('NODE_ENV') === 'development',
    app = express();

app.get('/', function(req, res) {
    fs.readFile(path.resolve('./public/index.html'), 'utf8', function(err, data) {
        var $ = cheerio.load(data);
        $('#app-data').text('APP_DATA=' + JSON.stringify({}));
        res.send($.html());
    });
});

app.get('/api/forecast/:address', function(req, res) {
    geocoder(req.params.address)
        .then(function(resp) {
            console.log(resp);

            var latlng = resp.results[0].geometry.location;

            return forecast.forLatLng(latlng.lat, latlng.lng);
        })
        .then(function(resp) {
            console.log(resp);
            res.json(resp);
        })
        .catch(function(err) {
            res.status(500).json(err);
        });
});

if (isDev) {
    webpackConfig.devtool = 'eval';

    app.use(webpackDevMiddleware(webpack(webpackConfig), {
        noInfo: true
    }));
}

app.use(express.static(path.resolve('./public')));

module.exports = app;
