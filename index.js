require('babel/register');

var express = require('express'),
    cheerio = require('cheerio'),
    config = require('config'),
    fs = require('fs'),
    path = require('path'),
    webpackDevMiddleware = require("webpack-dev-middleware"),
    webpack = require("webpack"),
    webpackConfig = require('./webpack.config');

var isDev = config.util.getEnv('NODE_ENV') === 'development';

if (isDev) {
    webpackConfig.devtool = 'eval';
}

var compiler = webpack(webpackConfig),
    app = express();

app.get('/', function(req, res) {
    fs.readFile(path.resolve('./public/index.html'), 'utf8', function(err, data) {
        var $ = cheerio.load(data);
        $('#app-data').text('APP_DATA=' + JSON.stringify({}));
        res.send($.html());
    });
});

app.get('/api/forecast/:state/:city', function(req, res) {

});

app.use(webpackDevMiddleware(compiler, {
    // options
}));

app.use(express.static(path.resolve('./public')));

module.exports = app;
