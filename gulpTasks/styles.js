var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');

module.exports = function(Config) {
    var notify = Config.notify;
    var checkFiles = Config.helpers.checkFiles;

    // SASS
    gulp.task('styles:main', function(done) {
        var src = Config.src.styles.main;
        var dest = Config.dest.css;

        Config.helpers.checkFiles(src);

        return gulp.src(src)
            .pipe(notify.onError())
            .pipe(sass())
            .pipe(gulp.dest(dest))
            .pipe(minifyCss({
                keepSpecialComments: 0
            }))
            .pipe(gulp.dest(dest))
            .pipe(notify.show("SASS Compiled"));
    });

    gulp.task('styles:vendors', function(done) {
        var src = Config.src.styles.vendors;
        var dest = Config.dest.css;

        Config.helpers.checkFiles(src);

        return gulp.src(src)
            .pipe(concat('vendors.css'))
            .pipe(gulp.dest(dest));

    });

    gulp.task('styles',['styles:main', 'styles:vendors']);
};
