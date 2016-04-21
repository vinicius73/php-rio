var gulp = require('gulp');

module.exports = function (Config) {
  gulp.task('watch', function () {
    var onChange = Config.helpers.onChangeHandle;

    gulp.watch(Config.watch.styles, ['styles:main']).on('change', onChange);
    gulp.watch(Config.watch.js, ['scripts:bundle']).on('change', onChange);
  });

  gulp.task('w', ['watch']);
};
