/**
 * Created by Dmitriy on 08.07.17.
 */
'use strict';
const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');
const LiveReloadPlugin = require('webpack-livereload-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require("path");

module.exports = {
    context: __dirname + '/src',
    entry: {
        index: "./index"
    },
    output: {
        path: '/var/www/html',
        publicPath: '/',
        filename: '[name].js?[hash]'
    },
    watch: NODE_ENV === 'development',
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader?presets[]=es2015',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader!autoprefixer-loader'
            },
            {
                test: /\.(mp3|wav)$/,
                loader: 'file-loader'
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'NODE_ENV': JSON.stringify(NODE_ENV)
        }),
        new LiveReloadPlugin({}),
        new CleanWebpackPlugin('build', {root: __dirname}),
        new HtmlWebpackPlugin({template: './template.html'})
    ],
    devtool: '#source-map'
};

if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = false;
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ]);
}