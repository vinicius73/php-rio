var gulp = require('gulp');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync').create();

module.exports = function (Config) {
  var buildTask = 'jigsaw:build';

  var watch = function watch(runBuild, buildCallback) {
    buildCallback = buildCallback || function() {};

    var onChangeHandle = Config.helpers.onChangeHandle;
    var makeRun = function makeRun(tasks) {
      if(runBuild === true) {
        tasks.push(buildTask);
      }

      tasks.push(buildCallback);

      return function(event) {
        onChangeHandle(event);
        runSequence.apply(gulp, tasks);
      }
    };

    gulp.watch(Config.watch.styles).on('change', makeRun(['styles:main']));
    gulp.watch(Config.watch.js).on('change', makeRun(['scripts:bundle']));

    if(runBuild === true) {
      gulp.watch(Config.watch.html).on('change', makeRun([]));
    }
  };

  gulp.task('watch', watch);

  gulp.task('server', [buildTask], function() {
    browserSync.init({
      server: {
        baseDir: "./build_local"
      }
    });

    watch(true, browserSync.reload);
  });

  gulp.task('w', ['watch']);
};
