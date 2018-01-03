var buildFolder = './dist/',
    gulp = require('gulp'),
    concat = require("gulp-concat"),
    rename = require('gulp-rename'),
    qunit = require('gulp-qunit'),
    uglify = require("gulp-uglify"),
    watch = require("gulp-watch"),
    babel = require('gulp-babel');

// Watch
gulp.task('watch', function () {
    gulp.watch('./src/*.js', ['build']);
});

// Minify JavaScript
gulp.task('build', function () {
    gulp.src('./src/*.js')
        .pipe(babel({
            plugins: ['transform-remove-strict-mode'],
            presets: ['env']
        }))
        .pipe(concat('rj.js'))
        .pipe(gulp.dest(buildFolder))
        .pipe(uglify({ output: { comments: '/^!/'}}))
        .pipe(concat('rj.min.js'))
        .pipe(gulp.dest(buildFolder));
});

// Test JavaScript
gulp.task('test', function () {
    return gulp.src('./test/tests.js')
        .pipe(qunit());
});
