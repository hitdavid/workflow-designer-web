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
            // { test: require.resolve("jquery"), loader: "expose?$! expose?jQuery" },
            { test: /\.css$/, loader: "style-loader!css-loader"},
            { test: /\.(woff|woff2|eot|ttf|otf)$/i, loader: 'url-loader?limit=81920&name=[name].[ext]'},
            { test: /\.(jpe?g|png|gif|svg)$/i, loader: 'url-loader?limit=81920&name=[name].[ext]'},
        ]
    },
    node: {
        fs: "empty"
    },
    // plugins: [
    // // 把jquery作为全局变量插入到所有的代码中
    // // 然后就可以直接在页面中使用jQuery了
    //     new webpack.ProvidePlugin({
    //         $: 'jquery',
    //         jQuery: 'jquery',
    //         'window.jQuery': 'jquery'
    //     }),
    // ]
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            mangle: {
                except: ['$super', '$', 'exports', 'require']
                //以上变量‘$super’, ‘$’, ‘exports’ or ‘require’，不会被混淆
            },
            compress: {
                warnings: false
            }
        })
    ]
};