var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "aurelia-dependency-injection", "lodash", "ssv-core", "../logging/logging"], function (require, exports, aurelia_dependency_injection_1, _, ssv_core_1, logging_1) {
    "use strict";
    var id = "route-builder.srv";
    // todo: map (with ...rest) and mapAll
    var RouteBuilder = (function () {
        function RouteBuilder(logService) {
            this.routes = new Map();
            this.logger = logService.getLogger(id);
            this.logger.debug("ctor");
        }
        RouteBuilder.prototype.map = function (routes) {
            for (var _i = 0, routes_1 = routes; _i < routes_1.length; _i++) {
                var route = routes_1[_i];
                this.validate(route);
                var selectedRoute = this.get(route.key);
                if (selectedRoute) {
                    throw Error("registering a route '" + route.key + "' which already exists!");
                }
                route.parentKey = this.extractParentKey(route);
                this.routes.set(route.key, route);
            }
        };
        RouteBuilder.prototype.get = function (key) {
            return this.routes.get(key);
        };
        RouteBuilder.prototype.generateUrl = function (key, data) {
            this.logger.debug("generateUrl", "searching route..", { key: key, data: data, routes: this.routes });
            var route = this.get(key);
            if (!route) {
                throw Error("generating url for route '" + route.key + "' not found!");
            }
            var routePath = this.buildRoutePath(route, "", data);
            this.logger.debug("generateUrl", "route found", { key: key, data: data, routePath: routePath });
            return routePath;
        };
        RouteBuilder.prototype.verify = function () {
            var _this = this;
            this.routes.forEach(function (route) {
                _this.verifyParent(route);
            });
        };
        RouteBuilder.prototype.verifyParent = function (route) {
            if (!route.parentKey) {
                return;
            }
            var parent = this.get(route.parentKey);
            if (!parent) {
                throw new Error("Parent '" + route.parentKey + "' not found for route key '" + route.key + "'");
            }
        };
        RouteBuilder.prototype.validate = function (route) {
            if (!route.key) {
                throw new Error("Route key must be defined");
            }
            if (route.model.route === undefined || route.model.route === null) {
                throw new Error("Route not defined for '" + route.key + "'");
            }
        };
        RouteBuilder.prototype.buildRoutePath = function (menuItem, routePath, data) {
            this.logger.debug("buildRoutePath", "building route..", { menuItem: menuItem, routePath: routePath });
            var route = menuItem.model.route;
            var routeValue;
            if (typeof route === "string") {
                routeValue = route;
            }
            else {
                routeValue = route[0];
            }
            if (routeValue.indexOf(":") >= 0) {
                var routeValueCopy = routeValue;
                routeValue = ssv_core_1.utils.string.interpolate(routeValue, data, ":");
                if (routeValueCopy === routeValue) {
                    throw new Error("route params for '" + routeValue + "' are not interpolated.");
                }
            }
            routePath = "/" + routeValue + routePath;
            if (routePath.indexOf("//") >= 0) {
                routePath = ssv_core_1.utils.string.replaceAll(routePath, "//", "/");
            }
            if (menuItem.parentKey) {
                var parentRoute = this.get(menuItem.parentKey);
                return this.buildRoutePath(parentRoute, routePath, data);
            }
            return routePath;
        };
        RouteBuilder.prototype.extractParentKey = function (route) {
            if (!_.isUndefined(route.parentKey)) {
                return route.parentKey;
            }
            var keySplit = route.key.split(".");
            if (keySplit.length === 1) {
                return undefined;
            }
            return keySplit[0];
        };
        RouteBuilder = __decorate([
            aurelia_dependency_injection_1.autoinject, 
            __metadata('design:paramtypes', [logging_1.LogService])
        ], RouteBuilder);
        return RouteBuilder;
    }());
    exports.RouteBuilder = RouteBuilder;
});
