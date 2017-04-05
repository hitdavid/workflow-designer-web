/**
 * Created by David on 2017/4/5.
 */

var path = require('path');
var webpack = require('webpack');

module.exports = {

    // context: path.resolve(__dirname, './'),

    entry: {
        main: './index.js',
        designer: './designer/index.js'
    },

    output: {
        path: path.resolve(__dirname, 'dev'),
        filename: '[name].js'
    },

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: [
                    {
                        loader: "babel-loader",
                        //options: {
                        //  presets: [
                        //    [
                        //      "es2015",
                        //      {
                        //        "modules": false,
                        //      },
                        //    ],
                        //    "stage-0",
                        //    "react",
                        //  ],
                        //  plugins: [
                        //    "transform-decorators-legacy",
                        //    "react-hot-loader/babel",
                        //  ],
                        //},
                    },
                ],
            },
            {
                test: /\.(png|gif)?$/,
                use: [
                    {
                        loader: "file-loader",
                        //options: {
                        //  presets: [
                        //    [
                        //      "es2015",
                        //      {
                        //        "modules": false,
                        //      },
                        //    ],
                        //    "stage-0",
                        //    "react",
                        //  ],
                        //  plugins: [
                        //    "transform-decorators-legacy",
                        //    "react-hot-loader/babel",
                        //  ],
                        //},
                    },
                ],
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            modules: false,
                            minimize: false,
                        },
                    }
                ],
            },
        ]
    },

    plugins: [

    ]



};