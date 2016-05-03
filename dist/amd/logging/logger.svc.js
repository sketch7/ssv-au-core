define(["require", "exports", "aurelia-logging"], function (require, exports, aurelia_logging_1) {
    "use strict";
    var LogService = (function () {
        function LogService() {
        }
        LogService.prototype.getLogger = function (sourceId) {
            var logger = aurelia_logging_1.getLogger(sourceId);
            return new Log(logger);
        };
        return LogService;
    }());
    exports.LogService = LogService;
    var Log = (function () {
        function Log(logger) {
            this.logger = logger;
        }
        Log.prototype.debug = function (method, message, data) {
            this.log("debug", method, message, data);
        };
        Log.prototype.info = function (method, message, data) {
            this.log("info", method, message, data);
        };
        Log.prototype.warn = function (method, message, data) {
            this.log("warn", method, message, data);
        };
        Log.prototype.error = function (method, message, data) {
            this.log("error", method, message, data);
        };
        Log.prototype.log = function (type, method, message, data) {
            if (data) {
                this.logger[type]("" + this.buildLogMessage(method, message), data);
            }
            else {
                this.logger[type]("" + this.buildLogMessage(method, message));
            }
        };
        Log.prototype.buildLogMessage = function (method, message) {
            if (message) {
                return method + " :: " + message;
            }
            else {
                return "" + method;
            }
        };
        return Log;
    }());
    exports.Log = Log;
});
