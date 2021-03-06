var webpack = require('webpack')
var path = require('path')

module.exports = {
    entry: {
    },
    output: {
        filename: "[name].js",
        chunkFilename:'[name].js',
        path:  "/dist",
        libraryTarget:'var',
        sourceMapFilename:'[name].map',
        //library:'libName',
        publicPath:'http://localhost:[dev_port]/[project_name]'
    },
    resolve: {
        root: [path.join(__dirname,'../../../node_modules'),'[node_module_path]'],
        alias:{}
    },
    resolveLoader: {
        root: [path.join(__dirname,'../../../node_modules'),'[node_module_path]']
    },
    externals:{},
    module: {
        noParse:[],
        loaders: [
            {
                test: /[\.jsx|\.js ]$/,
                exclude: /node_modules/,
                loaders: ["babel-loader?stage=0&optional[]=runtime"]
            },
            { test: /\.css$/, loader: "style!css" },
            {
                test: /\.less$/,
                loader: "style-loader!css-loader!less-loader"
            },
            { test: /\.(png|jpg|gif)$/, loader: 'url-loader' },
            {
                test   : /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                loader : 'url-loader'
            }
        ]
    },
    debug:true,
    //devtool:'source-map',
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.SourceMapDevToolPlugin(
            '[file].map', null,
            "[absolute-resource-path]", "[absolute-resource-path]")
    ]
}