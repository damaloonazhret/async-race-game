const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const EslintPlugin = require('eslint-webpack-plugin');

const baseConfig = {
    entry: path.resolve(__dirname, './src/index'),
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.ts$/i,
                use: 'ts-loader',
            },
            {
                test: /\.(mp3|wav)$/i,
                use: 'file-loader',
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, './dist'),
        publicPath: '/',
    },
    // output: {
    //     filename: 'index.js',
    //     path: path.resolve(__dirname, './build'),
    //     publicPath: './',
    // },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/index.html'),
            filename: 'index.html',
        }),
        new CleanWebpackPlugin(),
        new EslintPlugin({ extensions: ['ts', 'test.ts'] }),
    ],
    devServer: {
        open: false,
        static: [path.resolve(__dirname, './dist'), path.join(__dirname, './assets/music/')],
    },
};

module.exports = ({ mode }) => {
    const isProductionMode = mode === 'prod';
    const config = isProductionMode ? require('./webpack.prod.config') : require('./webpack.dev.config');

    return merge(baseConfig, config);
};
