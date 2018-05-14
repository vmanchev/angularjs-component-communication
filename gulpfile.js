var angularFilesort = require('gulp-angular-filesort');
var angularTemplatecache = require('gulp-angular-templatecache');
var browserSync = require('browser-sync');
var concat = require('gulp-concat');
var del = require('del');
var gulp = require('gulp');
var inject = require('gulp-inject');
var minifyHtml = require('gulp-minify-html');
var runSequence = require('run-sequence');
var uglify = require('gulp-uglify');
var wiredep = require('wiredep');

gulp.task('server', function (done) {
    return browserSync({
        server: {
            baseDir: './public'
        }
    }, done);
});

gulp.task('minify:js', function () {
    return gulp.src('src/**/*.js')
        .pipe(angularFilesort())
        // .pipe(uglify({
        //     mangle: false
        // }))
        .pipe(concat('app.min.js'))
        .pipe(gulp.dest('public/js'));
});

gulp.task('minify:vendor', function () {

    var target = gulp.src('public/index.html');
    var js = gulp.src(wiredep().js);

    return target
        .pipe(inject(
            js.pipe(concat('vendors.min.js'))
                //.pipe(uglify())
                .pipe(gulp.dest('./public/js')), { relative: true, name: 'bower' })
        )
        .pipe(gulp.dest('./public'));
})

gulp.task('index', function () {
    return gulp.src('src/index.html')
        .pipe(gulp.dest('public/'));
})

// make templateCache from all HTML filessrc
gulp.task('templates', function () {
    return gulp.src([
        'src/**/*.html',
        '!src/index.html'
    ])
        .pipe(minifyHtml())
        .pipe(angularTemplatecache({
            module: 'angularjs-component-communication'
        }))
        .pipe(gulp.dest('public/js'));
});

gulp.task('clean:public', function (cb) {
    return del([
        'public/*'
    ], cb);
});

gulp.task('reload', function () {
    return browserSync.reload();
});

gulp.task('build:basic', function* (cb) {
    runSequence(
        'clean:public',
        ['index', 'minify:js', 'templates'],
        'minify:vendor',
        'reload',
        cb
    );
});

gulp.task('watch', function (cb) {
    gulp.watch([
        'src/**/*.js',
        'src/**/*.html'], function () {
        runSequence(
            'clean:public',
            ['index', 'minify:js', 'templates'],
            'minify:vendor',
            'reload',
            'watch',
            cb
        );
    });

});

gulp.task('default', function (cb) {
    runSequence(
        'clean:public',
        ['index', 'minify:js', 'templates'],
        'minify:vendor',
        'server',
        'watch',
        cb
    );
});