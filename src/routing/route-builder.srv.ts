import {RouteConfig} from "aurelia-router";
import * as _ from "lodash";

import {LogService, ILog} from "../logging/logging";

const id = "route-builder.srv";

// todo: use maps for keys
// todo: change RouteParams to use interpolate instead
// todo: when parent, generate key combined with parents?
// todo: implement verify() - which verifies keys exists for parents.

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
			const selectedRoute = _.find(this.routes, { key: route.key });

			if (selectedRoute) {
				this.logger.error("map", "selected route already exists!", { routeKey: route.key });
				continue;
			}

			this.routes.push(route);
		}
	}

	generateUrl(key: string, params?: RouteParams[]): string {
		this.logger.debug("getByKey", "searching route..", { key: key, params: params, routes: this.routes });

		const route = _.find(this.routes, { key: key });

		if (!route) {
			this.logger.error("getByKey", "route not found", { routeKey: key });
			return "";
		}

		let routePath = this.buildRoutePath(route, "", params);
		this.logger.debug("getByKey", "route found", { key: key, params: params, routePath: routePath });

		return routePath;
	}

	private buildRoutePath(menuItem: Route, routePath: string, params?: RouteParams[]): string {
		this.logger.debug("buildRoutePath", "building route..", { menuItem: menuItem, routePath: routePath });

		let routeValue = <string>menuItem.model.route;

		if (_.startsWith(routeValue, ":", 0)) {
			const param = _.find(params, { key: routeValue });

			if (!param) {
				this.logger.error("buildRoutePath", "param not found!", { param: routeValue, params: params });
				throw Error(`route param '${routeValue}' not found!`);
			}

			routeValue = param.value;
		}

		routePath = `/${routeValue}${routePath}`;

		if (menuItem.parentKey) {
			const route = _.find(this.routes, { key: menuItem.parentKey });
			return this.buildRoutePath(route, routePath, params);
		}

		return routePath;
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