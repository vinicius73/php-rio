var gulp = require('gulp');
var browserSync = require('browser-sync').create();

module.exports = function (Config) {
  var watch = function watch() {
    var onChange = Config.helpers.onChangeHandle

    gulp.watch(Config.watch.styles, ['styles:main']).on('change', onChange);
    gulp.watch(Config.watch.js, ['scripts:bundle']).on('change', onChange);
  };

  gulp.task('watch', watch);

  gulp.task('server', function() {
    browserSync.init({
      server: {
        baseDir: "./build_local"
      }
    });

    gulp.watch(Config.watch.build).on('change', browserSync.reload);

    watch();
  });

  gulp.task('w', ['watch']);
};
