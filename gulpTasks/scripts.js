var gulp = require('gulp');
var browserify = require('browserify');
var vueify = require('vueify');
var vinylSource = require('vinyl-source-stream');
var concat = require('gulp-concat');

module.exports = function(Config) {
    var notify = Config.notify;
    var checkFiles = Config.helpers.checkFiles;
    var isProduction = Config.isProduction();

    // MAIN
    gulp.task('scripts:bundle', function(done) {
        var src = Config.src.js.bundle;
        var dest = Config.dest.js;
        var options = {
            debug: !isProduction,
        };

        Config.helpers.checkFiles(src);

        return browserify(src, options)
            .transform(vueify)
            .transform("babelify", {presets: ["es2015"]})
            .bundle().on('error', notify.callErrorNotify())
            .pipe(vinylSource('app.bundle.js'))
            .pipe(gulp.dest(dest))
            .pipe(notify.show('Finished scripts:bundle'));
    });

    // VENDOR
    gulp.task('scripts:vendors', function(done) {
        var src = Config.src.js.vendors;
        var dest = Config.dest.js;

        Config.helpers.checkFiles(src);

        return gulp.src(src)
            .pipe(concat('vendors.js'))
            .pipe(gulp.dest(dest));

    });

    gulp.task('scripts', ['scripts:bundle', 'scripts:vendors']);
};
