'use strict';

var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var UglifyesJsPlugin = require("uglifyes-webpack-plugin");
var path = require('path');

var ENV = process.env.npm_lifecycle_event;
var isTest = (ENV === 'test' || ENV === 'test-watch');
var isDev = ENV === 'dev';
var isProd = ENV === 'build';

console.log('**************************');
console.log('ENV: ' + ENV);

module.exports = function webpackConfig() {

    var config = {};

    config.entry = isTest ? void 0 : {
        oxs: './src/app/app.js',
    };

    var externals = {
        'socket.io-client':'io'
    };

    var resolve = {};
    resolve.alias = {
            'socket.io-client': path.join( __dirname, 'node_modules', 'socket.io-client'),
    };

    config.output = isTest ? {} : {
        path: __dirname + '/',
        publicPath: isProd ? './' : 'http://localhost:8080/',
        filename: isProd ? 'js/[name].[hash].js' : 'js/[name].bundle.js',
        chunkFilename: isProd ? 'js/[name].[hash].js' : 'js/[name].bundle.js'
    };

    if (isTest) {
        config.devtool = 'inline-source-map';
    } else if (!isProd) {
        config.devtool = 'source-map';
    }

    // Initialize module
    config.module = {
        noParse: [ path.join(__dirname, 'node_modules', 'socket.io-client', 'socket.io.js'), path.join(__dirname, 'src/assets', 'js', 'websocket-service.js')],
        rules: [{
            // JS LOADER
            test: /\.js$/,
            loader: 'babel-loader',
            query: {
                babelrc: false,
                presets: ['es2015'],
                "plugins": ["transform-object-assign"] // especially es6 syntax for object assign is being transpiled
            },
            exclude: /node_modules/
        }, {
            test: /\.css$/,
            loader: isTest ? 'null-loader' : ExtractTextPlugin.extract({
                fallbackLoader: 'style-loader',
                loader: [{
                    loader: 'css-loader',
                    options: {
                        sourceMap: true
                    }
                }, {
                    loader: 'postcss-loader'
                }],
            })
        }, {
            test: /\.scss$/,
            loader: isTest ? 'null-loader' : ExtractTextPlugin.extract({
                fallbackLoader: "style-loader",
                loader: [{
                    loader: 'css-loader',
                    options: {
                        sourceMap: true
                    }
                }, {
                    loader: "postcss-loader"
                }, {
                    loader: "sass-loader"
                }]
            })
        }, {
            test: /\.(png|jpg|jpeg|gif)$/,
            loader: {
                loader: 'file-loader',
                options: {
                    name: isTest ? 'img/oxs.[name].[ext]' : 'img/oxs.[name].[ext]'
                }
            }
        }, {
            test: /\.(svg|woff|woff2|ttf|eot)$/,
            loader: {
                loader: 'file-loader',
                options: {
                    name: isTest ? 'font/[name].[ext]' : 'font/[name].[ext]',
                    publicPath: isProd ? '/register/' : '/'
                }
            }
        }, {
            test: /\.html$/,
            loader: 'raw-loader'
        }]
    };

    if (isTest) {
        config.module.rules.push({
            enforce: 'pre',
            test: /\.js$/,
            exclude: [
                /node_modules/,
                /\.spec\.js$/
            ],
            loader: 'istanbul-instrumenter-loader',
            query: {
                esModules: true
            }
        })
    }

    config.plugins = [];

    if (!isTest) {

        config.plugins.push(
            new HtmlWebpackPlugin({
                template: './src/public/index.ejs',
                env: process.env.npm_lifecycle_event,
                baseUrl: '/',
                inject: 'body'
            }),

            new ExtractTextPlugin({
                filename: './css/oxs.[hash].css',
                disable: !isProd,
                allChunks: true
            })
        )
    }

    if (isProd) {
        config.plugins.push(

            new webpack.NoEmitOnErrorsPlugin(),

            new CopyWebpackPlugin([{
                from: __dirname + '/src/public'
            }])

        )
    }

    config.devServer = {
        contentBase: './src/public',
        stats: 'minimal'
    };

    return config;
}();