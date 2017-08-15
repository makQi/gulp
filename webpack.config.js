var webpack = require('webpack');
var fs = require('fs');
var path = require('path');
var glob = require('glob');
var srcDir = path.resolve(process.cwd(), 'src');
var jsDir = path.resolve(srcDir, 'js');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;

module.exports = {
    /*entry: {
        main: [__dirname + '/src/js/main.js', __dirname + '/src/js/login.js'],
        index: __dirname + '/src/js/index.js'
    },*/
    entry: Object.assign(getEntry(), {
        vendor: ['jquery', 'main']
    }),
    output: {
        // path: __dirname + '/dist/js', // 输出地址（__dirname当前项目目录）
        path: path.join(__dirname, "/dist/js"),
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
            name: 'vendor', // 上面入口定义的节点组
            // filename: 'vendor-build.js' //最后生成的文件名
            minChunks: Infinity
        })
    ]
};

/*function entries() {
    var jsDir = path.resolve(srcDir, 'js');
    var entryFiles = glob.sync(jsDir + '/*.{js,jsx}');
    var map = {};

    for (var i = 0; i < entryFiles.length; i++) {
        var filePath = entryFiles[i];
        var filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'));
        map[filename] = filePath;
    }
    console.log(map);
    return map;
}*/

/*function getEntry() {
    var jsPath = path.resolve(srcDir, 'js');
    var dirs = fs.readdirSync(jsPath);
    var matchs = [],
        files = {};
    dirs.forEach(function(item) {
        matchs = item.match(/(.+)\.js$/);
        if (matchs) {
            files[matchs[1]] = path.resolve(srcDir, 'js', item);
        }
    });
    return files;
}*/