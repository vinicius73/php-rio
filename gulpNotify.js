var realNotify = require("gulp-notify");
var plumber = require('gulp-plumber');
var gutil = require('gulp-util');
var notifyLinterReporter = require('gulp-notify-linter-reporters');
var beep = require('beepbeep');
var _ = require('lodash');

var notify = (function() {
    var parseOptions = function(_options, defaults) {
        defaults = defaults || {
            title: 'PHP Rio',
            //icon: path.join(__dirname, 'd6-logo.png')
        };

        if (_.isObject(_options)) {
            _.merge(defaults, _options);
        } else {
            defaults.message = _options;
        }

        return defaults;
    };

    var createCallErrorNotify = function callErrorNotify(options) {
        options = options || {}; //default
        return function (err) {
            console.log(err.toString());

            options.title = options.title || "gulp error in " + err.plugin;

            realNotify.onError(parseOptions(options))(err);

            beep(3);

            this.emit('end');
        };
    };

    var onErrorHandle = function onErrorHandle(options) {
        // error handeler function
        var onError = createCallErrorNotify(options) ;

        return plumber({
            errorHandler: onError
        });
    };

    var instanse = function() {

    };

    instanse.prototype.rootPath = __dirname;

    instanse.prototype.show = function(_options) {
        return realNotify(parseOptions(_options));
    };

    instanse.prototype.onError = onErrorHandle;

    instanse.prototype.callErrorNotify = createCallErrorNotify;

    instanse.prototype.onLinterError = function() {
        return notifyLinterReporter();
    };

    instanse.prototype.allDone = function allDone(message) {
        message = message || 'All tasks were completed!';

        return this.show(message);
    };

    return new instanse();
})();

module.exports = notify;
