var gulp = require('gulp'),
    minify = require('gulp-minify'),
    babel = require('gulp-babel'),
    concat = require('gulp-concat'),
    livereload = require('gulp-livereload');

gulp.task('default', function () {
    gulp.src([
            'resources/connection/Buffer.js',
            'resources/config.js',
            'resources/visualizer/**/*.js',
            'resources/simulator/Support/Vector.js'
        ])
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(concat('simulation.js'))
        .pipe(gulp.dest('app/'))
        .pipe(livereload());

    gulp.src(['bower_lib/**/*.js'])
        .pipe(concat('dependencies.js'))
        .pipe(gulp.dest('app/'))
        .pipe(livereload());

    gulp.src(['resources/index.html'])
        .pipe(gulp.dest('app/'))
        .pipe(livereload());
});

gulp.task('watch', function () {
    livereload.listen();
    gulp.watch([
        'resources/visualizer/**/*'
    ], ['default']);
});
