var app = require('./index'),
    path = require('path'),
    express = require('express'),
    config = require('config'),
    webpackDevMiddleware = require('webpack-dev-middleware'),
    webpack = require("webpack"),
    webpackConfig = require('./webpack.config');

/**
 * For development we use the webpack dev server as an express
 * middleware.
 *
 * The combination of the webpack dev server and nodemon ensure
 * that both our client and server code are auto reloaded on
 * every file change.
 *
 * This will be disabled in production mode.
 */
if (config.util.getEnv('NODE_ENV') === 'development') {
    webpackConfig.devtool = 'eval';

    app.use(webpackDevMiddleware(webpack(webpackConfig), {
        stats: false
    }));
}

app.use(express.static(path.resolve('./public')));

app.listen(4000, function() {
    console.log('Server running: http://localhost:' + 4000);
});
