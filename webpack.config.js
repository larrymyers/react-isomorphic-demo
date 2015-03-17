module.exports = {
    entry: {
        main: './app/main.js'
    },
    output: {
        path: './public',
        filename: 'app.js'
    },
    module: {
        loaders: [
            { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader' }
        ]
    }
};