const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    mode: "development",
    entry: {
        app: './src/index.js',
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    "style-loader", 
                    "css-loader", 
                    "sass-loader", 
                ]
            },
            {
              test: /\.(js|jsx)$/,
              exclude: /node_modules/,
              use: ['babel-loader']
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'fonts/'
                    }
                }]
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
        }),
        new CleanWebpackPlugin(['dev/*.js', 'dev/*.html', 'dev/static']),
        new webpack.DllReferencePlugin({
          context: __dirname,
          manifest: require('./dev/library/lib.json'),
        }),
        new CopyWebpackPlugin([
            { from: 'static' }
        ])
    ],
    output: {
        filename: '[name].[contenthash].js',
        publicPath: '/',
        path: path.resolve(__dirname, 'dev')
    },
    devServer: {
        contentBase: './dev',
        historyApiFallback: true,
    },
};


