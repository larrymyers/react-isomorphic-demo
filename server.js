var app = require('./index'),
    path = require('path'),
    express = require('express'),
    config = require('config'),
    webpackDevMiddleware = require('webpack-dev-middleware'),
    webpack = require("webpack"),
    webpackConfig = require('./webpack.config');

if (config.util.getEnv('NODE_ENV') === 'development') {
    webpackConfig.devtool = 'eval';

    app.use(webpackDevMiddleware(webpack(webpackConfig), {
        stats: false
    }));

    app.use(express.static(path.resolve('./public')));
}

app.listen(4000);

console.log('Server running: http://localhost:' + 4000);
