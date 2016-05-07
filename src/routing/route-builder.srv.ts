import {RouteConfig} from "aurelia-router";
import * as _ from "lodash";

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

	generateUrl(key: string, params?: RouteParams[]): string {
		this.logger.debug("generateUrl", "searching route..", { key: key, params: params, routes: this.routes });

		const route = this.get(key);

		if (!route) {
			throw Error(`generating url for route '${route.key}' not found!`);
		}

		let routePath = this.buildRoutePath(route, "", params);
		this.logger.debug("generateUrl", "route found", { key: key, params: params, routePath: routePath });

		return routePath;
	}

	private buildRoutePath(menuItem: Route, routePath: string, params?: RouteParams[]): string {
		this.logger.debug("buildRoutePath", "building route..", { menuItem: menuItem, routePath: routePath });

		// todo: handle array or string
		let routeValue = <string>menuItem.model.route;

		if (_.startsWith(routeValue, ":", 0)) {
			const param = _.find(params, { key: routeValue });

			if (!param) {
				throw Error(`route param '${routeValue}' not found!`);
			}

			routeValue = param.value;
		}

		routePath = `/${routeValue}${routePath}`;

		if (menuItem.parentKey) {
			const route = this.get(menuItem.parentKey);
			return this.buildRoutePath(route, routePath, params);
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