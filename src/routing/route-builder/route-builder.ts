import _ from "lodash";
import { autoinject } from "aurelia-dependency-injection";
import { string } from "@ssv/core";

import { LoggerFactory, ILog } from "../../logging/index";

// todo: map (with ...rest) and mapAll

@autoinject
export class RouteBuilder {
	private logger: ILog;
	private routes: Map<string, Route> = new Map<string, Route>();

	constructor(
		loggerFactory: LoggerFactory
	) {
		this.logger = loggerFactory.get("routeBuilder");
		this.logger.debug("ctor");
	}

	map(routes: Route[]) {
		for (const route of routes) {

			this.validate(route);
			const selectedRoute = this.get(route.key);

			if (selectedRoute) {
				throw Error(`registering a route '${route.key}' which already exists!`);
			}

			route.parentKey = this.extractParentKey(route);
			this.routes.set(route.key, route);
		}
	}

	get(key: string): Route | undefined {
		return this.routes.get(key);
	}

	generateUrl(key: string, data?: any): string {
		this.logger.debug("generateUrl", "searching route..", { key, data, routes: this.routes });

		const route = this.get(key);

		if (!route) {
			throw Error(`generating url for route '${key}' not found!`);
		}

		const routePath = this.buildRoutePath(route, "", data);
		this.logger.debug("generateUrl", "route found", { key, data, routePath });

		return routePath;
	}

	verify(): void {
		this.routes.forEach(route => {
			this.verifyParent(route);
		});
	}

	private verifyParent(route: Route): void {
		if (!route.parentKey) {
			return;
		}
		const parent = this.get(route.parentKey);
		if (!parent) {
			throw new Error(`Parent '${route.parentKey}' not found for route key '${route.key}'`);
		}
	}

	private validate(route: Route): void {
		if (!route.key) {
			throw new Error("Route key must be defined");
		}
		if (route.model.route === undefined || route.model.route === null) {
			throw new Error(`Route not defined for '${route.key}'`);
		}
	}

	private buildRoutePath(menuItem: Route, routePath: string, data?: any): string {
		this.logger.debug("buildRoutePath", "building route..", { menuItem, routePath });
		const route = menuItem.model.route;

		let routeValue: string;
		if (typeof route === "string") {
			routeValue = route;
		} else {
			routeValue = route[0];
		}

		if (routeValue.indexOf(":") >= 0) {
			const routeValueCopy = routeValue;
			routeValue = string.interpolate(routeValue, data, ":");
			if (routeValueCopy === routeValue) {
				throw new Error(`route params for '${routeValue}' are not interpolated.`);
			}
		}

		routePath = `/${routeValue}${routePath}`;
		if (routePath.indexOf("//") >= 0) {
			routePath = string.replaceAll(routePath, "//", "/");
		}
		if (menuItem.parentKey) {
			const parentRoute = this.get(menuItem.parentKey);
			if (!parentRoute) {
				return routePath;
			}
			return this.buildRoutePath(parentRoute, routePath, data);
		}

		return routePath;
	}

	private extractParentKey(route: Route): string | undefined {
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
	model: {
		route: string | string[]
	};
	parentKey?: string;
}

export interface RouteParams {
	key: string;
	value: string;
}