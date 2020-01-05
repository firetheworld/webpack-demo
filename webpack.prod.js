'use strict';

const path = require('path');
const webpack = require('webpack');
const MinCSSExtractPligin = require('mini-css-extract-plugin');
module.exports = {
    entry: {
        index: './src/index.js',
        search: './src/search.js'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name]_[chunkhash:8].js'
    },
    mode: 'production',
    module: {
        rules: [
            {
                test: /.css$/,
                use: [
                    MinCSSExtractPligin.loader,
                    'css-loader'
                ]
            },
            {
                test: /.less$/,
                use: [
                    MinCSSExtractPligin.loader,
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                test: /.js$/,
                use: 'babel-loader'
            },
            {
                test: /.(jpg|png|gif|jpeg)/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name]_[hash:8].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new MinCSSExtractPligin({
            filename: '[name]_[contenthash:8].css'
        })
    ]
}