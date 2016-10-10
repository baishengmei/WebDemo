/**
 * Created by baishm on 2016/10/10.
 */
var path = require("path");
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var config = {
    entry: [
        'webpack/hot/only-dev-server',
        "./index.js"
    ],
    output: {
        path: path.resolve(__dirname, "build"),
        publicPath: "build/",
        filename: "build.js"
    },
    resolve: {
        extensions: ['', '.js', '.jsx', 'css']
    },
    module: {
        loaders: [{
            jsx: /\.(js|jsx)$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: [ 'react','es2015', 'stage-0']
            }
        }]
    },
};
module.exports = config;