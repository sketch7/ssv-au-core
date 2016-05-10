import {RouteConfig} from "aurelia-router";
import * as _ from "lodash";
import {utils} from "ssv-core";

import {LogService, ILog} from "../logging/logging";

const id = "route-builder.srv";

// todo: use maps for keys
// todo: map (with ...rest) and mapAll
// todo: change RouteParams to use interpolate instead
// todo: implement verify() - which verifies keys exists for parents.
// todo: add validation for model or model.route when undefined should throw

// @autoinject
export class RouteBuilder {
	private logger: ILog;
	private routes: Route[] = [];

	constructor(
		logService: LogService
	) {
		this.logger = logService.getLogger(id);
		this.logger.debug("ctor");
	}

	map(routes: Route[]) {
		for (let route of routes) {
			const selectedRoute = this.get(route.key);

			if (selectedRoute) {
				throw Error(`registering a route '${route.key}' which already exists!`);
			}

			route.parentKey = this.extractParentKey(route);

			this.routes.push(route);
		}
	}

	get(key: string): Route {
		return _.find(this.routes, { key: key });
	}

	generateUrl(key: string, data?: any): string {
		this.logger.debug("generateUrl", "searching route..", { key: key, data: data, routes: this.routes });

		const route = this.get(key);

		if (!route) {
			throw Error(`generating url for route '${route.key}' not found!`);
		}

		let routePath = this.buildRoutePath(route, "", data);
		this.logger.debug("generateUrl", "route found", { key: key, data: data, routePath: routePath });

		return routePath;
	}

	private buildRoutePath(menuItem: Route, routePath: string, data?: any): string {
		this.logger.debug("buildRoutePath", "building route..", { menuItem: menuItem, routePath: routePath });
		const route = menuItem.model.route;

		let routeValue: string;
		if (typeof route === "string") {
			routeValue = route;
		} else {
			routeValue = route[0];
		}

		if (routeValue.indexOf(":") >= 0) {
			const routeValueCopy = routeValue;
			routeValue = utils.string.interpolate(routeValue, data, ":");
			if (routeValueCopy === routeValue) {
				throw new Error(`route params for '${routeValue}' are not interpolated.`);
			}
		}

		routePath = `/${routeValue}${routePath}`;
		if (routePath.indexOf("//") >= 0) {
			routePath = this.replaceAll(routePath, "//", "/");
		}
		if (menuItem.parentKey) {
			const parentRoute = this.get(menuItem.parentKey);
			return this.buildRoutePath(parentRoute, routePath, data);
		}

		return routePath;
	}

	private extractParentKey(route: Route): string {

		if (!_.isUndefined(route.parentKey)) {
			return route.parentKey;
		}

		const keySplit = route.key.split(".");
		if (keySplit.length === 1) {
			return undefined;
		}

		return keySplit[0];
	}

	// todo: move to ssv-core
	private replaceAll(value: string, search: string, replacement: string): string {
		return value.replace(new RegExp(search, "g"), replacement);
	};
}

export interface Route {
	key: string;
	model: RouteConfig;
	parentKey?: string;
}

export interface RouteParams {
	key: string;
	value: string;
}