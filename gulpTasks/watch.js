var gulp = require('gulp');
var browserSync = require('browser-sync').create();

module.exports = function (Config) {
  var buildTask = 'jigsaw:build';

  var watch = function watch(runBuild) {
    var onChange = Config.helpers.onChangeHandle
    var defaultTasks = [];

    if(runBuild === true) {
      defaultTasks.push(buildTask);
      gulp.watch(Config.watch.html, [buildTask]);
    }

    gulp.watch(Config.watch.styles, ['styles:main'].concat(defaultTasks)).on('change', onChange);
    gulp.watch(Config.watch.js, ['scripts:bundle'].concat(defaultTasks)).on('change', onChange);
  };

  gulp.task('watch', watch);

  gulp.task('server', [buildTask], function() {
    browserSync.init({
      server: {
        baseDir: "./build_local"
      }
    });


    gulp.watch(Config.watch.build).on('change', browserSync.reload);

    watch(true);
  });

  gulp.task('w', ['watch']);
};
