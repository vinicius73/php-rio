var gulp = require('gulp');
var Config = require('./gulpConfig.js');

Config.loadTasks('gulpTasks');

function rev(gulp) {
    gulp.src('.')
        .on('finish', function() {
            return gulp.start('rev');
        })
}

gulp.task('default', ['copy', 'scripts', 'styles']);

gulp.task('build:main', ['scripts:bundle', 'styles:main']);

gulp.task('build:assets', ['copy']);

gulp.task('build:vendors', ['scripts:vendors', 'styles:vendors']);

gulp.task('build:scripts', ['scripts']);

gulp.task('build:styles', ['styles']);
