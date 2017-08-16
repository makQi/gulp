var gulp = require('gulp'),
    webpack = require('gulp-webpack'),
    changed = require('gulp-changed'), // 只操作修改过的文件，.pipe(changed('dist')) 对比文件是否有过改动（此处填写的路径和输出路径保持一致）
    sourcemaps = require('gulp-sourcemaps'), // 来源地图，压缩过后，调试代码时使用    
    sftp = require('gulp-sftp'), // 将代码发布至服务器  
    concat = require('gulp-concat'), // 合并文件  
    connect = require('gulp-connect'), // 本地Web服务器
    livereload = require('gulp-livereload'), // 实时自动刷新页面
    clean = require('gulp-clean'), // 文件清理
    runSequence = require('run-sequence'), // 控制task执行顺序，同步执行
    rev = require('gulp-rev'), // 加MD5后缀
    revCollector = require('gulp-rev-collector'), // 替换html引用，加了md5后缀的文件名
    rename = require('gulp-rename'), // 文件重命名
    autoprefixer = require('gulp-autoprefixer'), // css自动添加前缀    
    imagemin = require('gulp-imagemin'), // 图片压缩
    pngquant = require('imagemin-pngquant'), // 深度压缩图片
    minifyHtml = require('gulp-minify-html'), // html压缩
    minifyCss = require('gulp-minify-css'), // css压缩
    uglify = require('gulp-uglify'); // js压缩

// 定义文件路径
var files = {
    clean: ['dist', 'rev'], // 清理文件路径
    upPath: 'dist/**/*.*', // 上传文件路径，通配所有文件
    importPath: 'src', // 源输入路径
    outputPath: 'dist' // 编译后的输出路径
};

// 合并代码
gulp.task('concat', function() {
    return gulp.src(files.importPath + '/js/concat/*.js')
        .pipe(concat('public.js'))
        .pipe(gulp.dest(files.importPath + '/js/'));
});

// 代码发布至服务器
gulp.task('sftp', function() {
    return gulp.src(files.upPath)
        .pipe(sftp({
            host: 'website.com',
            port: 8888,
            key: 'windows',
            remotePath: '/',
            user: 'makQi',
            pass: '12345',
        }));
});

// 清理文件
gulp.task('clear', function() {
    return gulp.src(files.clean, { read: false })
        .pipe(clean());
});

// image处理
gulp.task('images', function() {
    return gulp.src(files.importPath + '/**/*.{png,jpg,gif,svg}') // 指明源文件路径、并进行文件匹配
        .pipe(imagemin({
            progressive: true, // 无损压缩JPG图片
            svgoPlugins: [{ removeViewBox: false }], // 不移除svg的viewbox属性
            use: [pngquant()] // 使用pngquant插件进行深度压缩
        }))
        .pipe(gulp.dest(files.outputPath)); // 输出路径
});

// css处理
gulp.task('css', function() {
    return gulp.src(files.importPath + '/**/*.css')
        .pipe(autoprefixer({ // 自动添加前缀
            browsers: ['last 2 versions', '> 1%', 'Firefox <= 20', 'not ie <= 8'],
            remove: false,
            cascade: false
        }))
        // .pipe(minifyCss()) // 压缩
        .pipe(rev()) // 加MD5后缀
        .pipe(gulp.dest(files.outputPath)) // 文件输出路径
        .pipe(rev.manifest({
            path: 'rev-manifest-css.json'
        })) // 加MD5生成json文件
        .pipe(gulp.dest('./rev')); // json输出地址
});

// JS处理
gulp.task('script', function() {
    return gulp.src(files.importPath + '/**/*.js') // 指明源文件路径、并进行文件匹配，代表src下所有html文件以及文件夹里面的html文件
        .pipe(uglify()) // 压缩 
        .pipe(rev()) // 加MD5后缀
        .pipe(gulp.dest(files.outputPath)) // 文件输出路径
        .pipe(rev.manifest({
            path: 'rev-manifest-js.json'
        })) // 加MD5生成json文件
        .pipe(gulp.dest('./rev')); // json输出地址
});

// html处理
gulp.task('html', function() {
    return gulp.src(['./rev/**/*.json', files.importPath + '/**/*.html'])
        .pipe(revCollector({
            replaceReved: true
        }))
        // .pipe(minifyHtml()) //压缩 
        .pipe(gulp.dest(files.outputPath));
});

// 创建web本地服务
gulp.task('webServer', function() {
    connect.server({ // http:127.0.0.1:8888
        // host: 'www.mak.com',
        port: 8888, //端口号，可不写，默认8000
        root: './', //当前项目主目录
        livereload: true //自动刷新
    });
});

// 监听任务，文件发生改变就行任务  执行命令：gulp watch
gulp.task('watch', function() {
    livereload.listen(); // 自动刷新页面
    gulp.watch(files.importPath + '/**/*.html', ['html']); // 监听 html
    gulp.watch(files.importPath + '/**/*.css', ['css']); // 监听 css
    gulp.watch(files.importPath + '/**/*.{png,jpg,gif,svg}', ['images']); // 监听 images
    gulp.watch(files.importPath + '/**/*.js', ['script']); // 监听 js
});

// gulp-webpack打包JS
// gulp.task('webpack', function() {
//     return gulp.src(files.importPath + '/**/*.js')
//         .pipe(webpack(require('./webpack.config.js')))
//         .pipe(gulp.dest(files.outputPath))
// });

// 开启，自动监听与刷新页面服务
gulp.task('auto', ['webServer', 'watch']); // 执行命令：gulp auto

// 默认任务，按顺序执行
gulp.task('default', function(callback) { // 执行命令：gulp
    runSequence(
        'concat',
        'clear', ['script', 'css', 'images'],
        'html',
        callback);
});

// "webpack": "webpack --config webpack.config.js --progress --display-modules --colors --display-reason",  // 命令参数，例如：npm run webpack