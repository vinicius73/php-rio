var gulp = require('gulp');
var flatten = require('gulp-flatten');
var imagemin = require('gulp-imagemin');
var gulpif = require('gulp-if');

module.exports = function(Config) {
    var isProduction = Config.isProduction();

    // -- FONTS
    gulp.task('copy:fonts', ['clean:fonts'], function() {
        var dest = Config.dest.fonts;
        var src = Config.src.fonts;

        return gulp.src(src)
            .pipe(flatten())
            .pipe(gulp.dest(dest));
    });

    // -- IMAGES
    gulp.task('copy:images', ['clean:images'], function () {
        var dest = Config.dest.images;
        var src = Config.src.images;

        return gulp.src(src)
        .pipe(gulpif(isProduction, imagemin({
                progressive: true,
                svgoPlugins: [{removeViewBox: false}],
                optimizationLevel: 5,
                multipass: true
            })))
        .pipe(gulp.dest(dest));
    });

    gulp.task('copy', ['copy:fonts', 'copy:images']);
};
