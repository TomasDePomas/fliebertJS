var gulp = require('gulp'),
    sass = require('gulp-sass'),
    minify = require('gulp-minify'),
    minifyCSS = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    livereload = require('gulp-livereload');

gulp.task('default', function () {
    gulp.src([
            'resources/js/Support/*.js',
            'resources/js/*.js',
            'resources/js/WorldObjects/*.js',
        ])
        .pipe(concat('simulation.js'))
        .pipe(minify())
        .pipe(gulp.dest('assets/js/'))
        .pipe(livereload());

    gulp.src('resources/js/lib/**/*min.js')
        .pipe(concat('dependencies.js'))
        .pipe(gulp.dest('assets/js/'))
        .pipe(livereload());

    gulp.src(['resources/css/**/*.css', 'resources/sass/*.scss'])
        .pipe(sass())
        .pipe(minifyCSS())
        .pipe(concat('style.min.css'))
        .pipe(gulp.dest('assets/css/'))
        .pipe(livereload());

    gulp.src('resources/js/lib/src/**/*')
        .pipe(gulp.dest('assets/lib/'));
});

gulp.task('watch', function () {
    livereload.listen();
    gulp.watch([
        'resources/js/**/*.js',
        'resources/css/**/*.css',
        'resources/sass/**/*.scss'
    ], ['default']);
});