var gulp = require('gulp');
var exec = require('child_process').exec;

module.exports = function (Config) {
    gulp.task('jigsaw:build', function (cb) {
      exec('jigsaw build', function (err, stdout, stderr) {
        console.log(stdout);
        if(stderr) {
          console.log(stderr);
        }
        cb(err);
      });
    });
};
