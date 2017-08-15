var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");

module.exports = {
    entry: {
        main: [__dirname + '/src/js/main.js', __dirname + '/src/js/login.js'],
        index: __dirname + '/src/js/index.js'
    },
    output: {
        path: __dirname + '/dist/js', // 输出地址（__dirname当前项目目录）
        filename: '[name].js' //最终打包生产的文件名
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: __dirname + '/src/index.html', //引用模版
            filename: __dirname + '/dist/index.html', //输入出模版
            inject: 'body', //在body中插入引用
            hash: true //给页面引用加上MD5的hash值
        }),
        // 拆分插件
        new CommonsChunkPlugin({
            name: 'main', // 上面入口定义的节点组
            filename: 'main-build.js' //最后生成的文件名
        })
    ]
};