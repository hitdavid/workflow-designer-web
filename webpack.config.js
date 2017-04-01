/**
 * Created by David on 2017/3/30.
 */
var webpack=require('webpack');

module.exports = {
    entry: "./index.js",
    output: {
        path: __dirname,
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {
                test: require.resolve('./scripts/jquery/jquery-1.9.1.js'),
                loader: 'expose?jQuery!expose?$'
            }
        ],
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env' ,
                            [ "es2015", { strict: false, loose: true } ],
                        ]
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader" },
                ],
            },
            {
                test: /\.useable\.css$/,
                use: [
                    { loader: "style-loader/useable"},
                    { loader: "css-loader" },
                ],
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    // { loader: "url-loader?limit=10240"},
                    { loader: "file-loader" },
                ],
            },
        ],
    },
    node: {
        fs: "empty"
    },
    plugins: [
        // new webpack.DefinePlugin({ global: {} }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"

        }),
    ],
    externals:{
        'jquery':'window.jQuery'
    }

    // plugins: [
    //     new webpack.optimize.UglifyJsPlugin({
    //         mangle: {
    //             except: ['$super', '$', 'exports', 'require', 'wizardAddCase', 'eve']
    //             //以上变量‘$super’, ‘$’, ‘exports’ or ‘require’，不会被混淆
    //         },
    //         compress: {
    //             warnings: false
    //         }
    //     })
    // ]
};