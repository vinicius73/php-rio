var gulp = require('gulp');
var del = require('del');

module.exports = function (Config) {
    // -- FONTS
    gulp.task('clean:fonts', function () {
        var src = Config.delPaths.fonts;

        return del(src);
    });

    // -- IMAGES
    gulp.task('clean:images', function () {
        var src = Config.delPaths.images;

        return del(src);
    });

    gulp.task('clean', ['clean:fonts', 'clean:images']);
};
