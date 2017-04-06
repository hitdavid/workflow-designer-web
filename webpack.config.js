/**
 * Created by David on 2017/4/5.
 */

var path = require('path');
var webpack = require('webpack');

module.exports = {

    context: __dirname,
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
                        loader: "url-loader",
                        options: {
                            name: "[name].[ext]",
                            limit: 500000
                        },
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

    resolve: {
        modules: [
            path.resolve(__dirname),
            "node_modules",
        ],
        extensions: [
            ".jsx",
            ".js",
        ],
    },

    plugins: [
        new webpack.ProvidePlugin({
            jQuery: 'jquery',
            $: "jquery",
            draw2d: "scripts/draw2d/draw2d.js",
            RGBColor: "scripts/draw2d/lib/rgbcolor.js"
        }),
        // new webpack.optimize.UglifyJsPlugin({
        //         mangle: {
        //             except: ['$super', '$', 'exports', 'require', 'module', 'export']
        //             //以上变量‘$super’, ‘$’, ‘exports’ or ‘require’，不会被混淆
        //         },
        //         compress: {
        //             warnings: false
        //         }
        //     })
    ]

};