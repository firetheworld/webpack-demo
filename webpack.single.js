'use strict';

const path = require('path');
const MinCSSExtractPligin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
    entry: {
        main: './src/finance/index.js',
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name]_[chunkhash:8].js'
    },
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        // compress: true,
        port: 9000,
    },
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
                    'less-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => require('autoprefixer')({
                                browsers: ['last 2 version', '>1%', 'ios 7']
                            })
                        }
                    },
                    {
                        loader: 'px2rem-loader',
                        options: {
                            remUnit: 75,
                            remPrececision: 8
                        }
                    }
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
        }),
        new OptimizeCssAssetsWebpackPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano')
        }),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, `src/finance/index.html`),
            filename: `index.html`,
            // chunks: ['commons', 'vendors', 'main'],
            inject: true,
        })
    ],
    // optimization: {
    //     splitChunks: {
    //         minSize: 30000,
    //         cacheGroups: {
    //             vendors: {
    //                 test: /(react|react-dom)/,
    //                 name: 'vendors',
    //                 chunks: 'all'
    //             },
    //             commons: {
    //                 name: 'commons',
    //                 chunks: 'all',
    //                 minChunks: 2
    //             }
    //         }
    //     }
    // }
}