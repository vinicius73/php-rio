'use strict';

var _ = require('lodash');
var fs = require('fs');
var gutil = require('gulp-util');
var notify = require('./gulpNotify.js');
var path = require('path');
var pkgConf = require('./package.json');

var txtGreen = function txtGreen(txt) {
  return gutil.colors.bgGreen(txt);
};
var txtRed = function txtRed(txt) {
  return gutil.colors.bgRed(txt);
};

var pathJoin = function pathJoin(base, _string) {
  if (_.isArray(_string)) {
    return _string.map(function (st) {
      return pathJoin(base, st);
    });
  }

  return path.join(base, _string);
};

module.exports = (function () {
  var PATH_ROOT = __dirname;
  var PATH_SRC = pathJoin(PATH_ROOT, 'source/_assets');
  var PATH_DEST = pathJoin(PATH_ROOT, 'source/assets');
  var PATH_BUILD = pathJoin(PATH_ROOT, 'build_local');

  var Config = function Config(_env) {
    this.ENV = (_env.production) ? 'production' : 'development';

    // proccess fonts src
    var fontsSrc = (function () {
      var fonts = this.rootPath(pkgConf['gulp-config'].fonts);
      fonts.push(this.srcPath('/fonts/'));
      return fonts.map(function (str) {
        return str + '**/*.{eot,svg,ttf,woff,woff2}';
      });
    }).call(this);

    // make src object
    this.src = {
      js: {
        bundle: this.srcPath('/js/app.js'),
        vendors: this.rootPath(pkgConf['gulp-config'].vendors.js),
      },
      rev: {
        files: pkgConf['gulp-config'].rev,
        options: {
          base: 'public',
        },
      },
      images: this.srcPath('img/**/*.{jpg,svg,gif,png,jpeg}'),
      fonts: fontsSrc,
      styles: {
        main: this.srcPath('/sass/main.scss'),
        vendors: pkgConf['gulp-config'].vendors.css,
      },
      jshint: this.srcPath(['/js/**/*.js']),
    };

    this.dest = {
      css: this.destPath('/css'),
      js: this.destPath('/js'),
      fonts: this.destPath('/fonts'),
      images: this.destPath('/img'),
      rev: this.destPath('/build'),
    };

    this.watch = {
      styles: this.srcPath(['/**/*.scss']),
      js: this.srcPath(['/js/**/*.{js,vue}']),
      build: this.buildPath(['/**/*.js', '/**/*.css', '/**/*.html']),
    };

    this.delPaths = {
      fonts: [this.dest.fonts],
      images: [this.dest.images],
    };
  };

  Config.prototype.paths = {
    root: PATH_ROOT,
    src: PATH_SRC,
    dest: PATH_DEST,
    build: PATH_BUILD,
  };

  Config.prototype.isProduction = function isProduction() {
    return this.ENV == 'production';
  };

  Config.prototype.rootPath = function rootPath(value) {
    return pathJoin(this.paths.root, value);
  };

  Config.prototype.srcPath = function srcPath(value) {
    return pathJoin(this.paths.src, value);
  };

  Config.prototype.destPath = function destPath(value) {
    return pathJoin(this.paths.dest, value);
  };

  Config.prototype.buildPath = function buildPath(value) {
    return pathJoin(this.paths.build, value);
  };

  Config.prototype.getBanner = function () {
    return ['/*!', ' * ' + pkgConf.name, ' * @version v' + pkgConf.version + '.' + Date.now(), ' * @license ' + pkgConf.license, ' * @autor '.pkgConf.autor, ' */', ''].join('\n');
  };

  Config.prototype.helpers = {
    checkFiles: function checkFiles(_files) {
      _files = Array.isArray(_files) ? _files : [_files];
      _files.forEach(function (file) {
        if (!(file.match(/\*/) || fs.existsSync(file))) {
          console.log('  - ' + txtRed(file) + ' <-- Not Found');
        }
      });
    },

    onChangeHandle: function (event) {
      console.log(txtGreen('file ' + path.relative(PATH_ROOT, event.path) + ' was ' + event.type));
      console.log(txtGreen('running tasks...'));
    },
  };
  Config.prototype.loadTasks = function loadTasks(tasksPath) {
    var ConfigInstanse = this;
    fs.readdirSync(ConfigInstanse.rootPath(tasksPath)).filter(function (file) {
      return (/\.(js|coffee)$/i).test(file);
    }).map(function (file) {
      require(ConfigInstanse.rootPath(pathJoin(tasksPath, file)))(ConfigInstanse);
    });
  };

  notify.rootPath = Config.prototype.paths.root;
  Config.prototype.notify = notify;
  var args = args = require('yargs')
      .alias('p', 'production')
      .default('production', false)
      .argv;
  return new Config(args);
})();
