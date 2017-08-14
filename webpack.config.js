var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        main: __dirname + '/src/js/main.js',
        user: [__dirname + '/src/js/login.js', __dirname + '/src/js/index.js']
    },
    output: {
        path: __dirname + '/dist/js', // 输出到那个目录下（__dirname当前项目目录）
        filename: 'bundle.js' //最终打包生产的文件名
    },
    /*plugins: [
        new HtmlWebpackPlugin({
            filename: __dirname + '/build/html/login-build.html',
            template: __dirname + '/src/tpl/login.html',
            inject: 'head',
            hash: true
        }),
        // 拆分插件
        new webpack.optimize.CommonsChunkPlugin({
            name: 'user', // 上面入口定义的节点组
            filename: 'build-user.js' //最后生成的文件名
        })
    ]*/
};