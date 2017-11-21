var path = require("path");
var webpack = require('webpack');
var BundleTracker = require('webpack-bundle-tracker');

module.exports = {
    context: __dirname,
    entry: './values/static/js/index.js',
    output: {
        path: path.resolve('./values/static/bundles/'),
        filename: "[name]-[hash].js"
    },

    plugins: [
        new BundleTracker({ filename: './webpack-stats.json' })
    ],

    module: {
        loaders: [
            {
                test: /\.js$/, exclude: /node_modules/, loader: 'babel',
                query: {
                    cacheDirectory: true,
                    presets: ['es2015', 'react']
                }
            }
        ]
    }
};