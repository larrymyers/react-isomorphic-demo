var webpackDevMiddleware = require("webpack-dev-middleware");
var webpack = require("webpack");

var compiler = webpack({
    // configuration
    output: { path: '/public' }
});

app.use(webpackDevMiddleware(compiler, {
    // options
}));