'use strict';

const path = require('path');
const webpack = require('webpack');
const MinCSSExtractPligin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const glob = require('glob');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');

const setMPA = () => {
    const entry = {};
    const htmlWebpackPlugins = [];
    const entryFiles = glob.sync(path.join(__dirname, './src/*/index.js'));
    const names = entryFiles.map(item => {
        const file = item.match(/src\/(.*)\/index\.js/);
        const pageName = file && file[1];
        entry[pageName] = item;
        htmlWebpackPlugins.push(
            new HtmlWebpackPlugin({
                template: path.join(__dirname, `src/${pageName}/index.html`),
                filename: `${pageName}.html`,
                chunks: ['commons', 'vendors', pageName],
                inject: true,
                minify: {
                    html5: true,
                    collapseWhitespace: true,
                    preserveLineBreaks: false,
                    minifyCSS: true,
                    minifyJS: true,
                    removeComments: false
                }
            })
        )
        return pageName;
    });
    return {
        entry,
        htmlWebpackPlugins,
    }
}
const {
    entry,
    htmlWebpackPlugins,
} = setMPA();

module.exports = {
    entry,
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name]_[chunkhash:8].js'
    },
    mode: 'development',
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000
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
        new CleanWebpackPlugin()
    ].concat(htmlWebpackPlugins),
    optimization: {
        splitChunks: {
            minSize: 0,
            cacheGroups: {
                vendors: {
                    test: /(react|react-dom)/,
                    name: 'vendors',
                    chunks: 'all'
                },
                commons: {
                    name: 'commons',
                    chunks: 'all',
                    minChunks: 2
                }
            }
        }
    }
}