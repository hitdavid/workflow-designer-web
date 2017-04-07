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
            Class: "scripts/draw2d/lib/Class.js",
            draw2d: "scripts/draw2d/draw2d.js",
            RGBColor: "scripts/draw2d/lib/rgbcolor.js",

            Accordion1: "designer/accordion/Accordion.js",
            Application: "designer/Application.js",
            ToolBar1: "designer/toolbar/ToolBar.js",
            Canvas1: "designer/canvas/Canvas.js",
            BranchTask: "designer/figures/BranchTask.js",
            Start: "designer/figures/Start.js",
            End: "designer/figures/End.js",
            RoleTask: "designer/figures/RoleTask.js",
            UserTask: "designer/figures/UserTask.js",
            Connection: "designer/figures/Connection.js",

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