var path = require('path');

module.exports = {
    entry: {
        main: path.resolve('./app/main.js')
    },
    output: {
        path: path.resolve('./public'),
        filename: 'app.js',
        publicPath: '/public/'
    },
    module: {
        loaders: [
            { test: /\.jsx$/, exclude: /node_modules/, loader: 'jsx-loader' }
        ]
    }
};
