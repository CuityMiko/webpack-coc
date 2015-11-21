'use strict';

var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');
var path = require('path');

var autoprefixer = require('autoprefixer');
var precss = require('precss');

module.exports = {
    entry: {},
    output: {
        filename: '[name].js?v=[chunkhash]',
        chunkFilename: '[name].js?v=[chunkhash]',
        path: '[dist_path]/[project_name]',
        libraryTarget: 'umd',
        publicPath: '[cdn_path]/[project_name]/'
    },
    //devtool: 'eval',
    externals: {},

    resolve: {
        root: [path.join(__dirname, '../../../node_modules'), '[node_module_path]']
    },
    resolveLoader: {
        root: [path.join(__dirname, '../../../node_modules'), '[node_module_path]']
    },
    module: {
        //noParse:[],
        loaders: [{
            test: /[\.jsx|\.js ]$/,
            exclude: /node_modules/,
            loader: 'babel-loader?stage=0&optional[]=runtime'
        }, {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
        }, {
            test: /\.less$/,
            loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap!postcss-loader!less-loader')
        }, {
            test: /\.(png|jpg|gif)$/,
            loader: 'file-loader?name=img/[name]-[hash].[ext]'
        }]
    },
    devtool: 'sourcemap',
    plugins: [new ExtractTextPlugin('[name].css?v=[chunkhash]'), new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
    }), new webpack.optimize.UglifyJsPlugin({
        //mangle: {
        //    except: ['$', 'exports', 'require']
        //},
        output: { comments: false },
        exclude: /\.min\.js$/
    }), new webpack.optimize.CommonsChunkPlugin({
        name: 'common',
        filename: '[name].js?v=[chunkhash]',
        minChunks: function minChunks(module, count) {
            //引用测试大于某个次数
            if (count >= 3) {
                return true;
            }

            var resourceName = module.resource;
            if (resourceName) {
                resourceName = resourceName.substring(resourceName.lastIndexOf(path.sep) + 1);
            }
            var reg = /^(\w)+.common/;
            if (reg.test(resourceName)) {
                return true;
            }

            return false;
        }
    })],
    postcss: function postcss() {
        return [autoprefixer, precss];
    }
};