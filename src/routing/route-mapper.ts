// reference: https://github.com/heruan/aurelia-route-mapper/blob/master/src/route-mapper.ts

import { autoinject } from "aurelia-dependency-injection";
import { RouteRecognizer, ConfigurableRoute } from "aurelia-route-recognizer";
import { string } from "@ssv/core";

import { RouteConfig } from "./route-mapper.model";

const seperator = ".";

@autoinject
export class RouteMapper {

	constructor(
		private routeRecognizer: RouteRecognizer
	) {
	}

	map(routes: RouteConfig[], parentName = "", parentRoute = ""): void {
		for (let route of routes) {

			const routeValue = typeof route.route === "string" ? route.route : route.route[0];

			const routeName = route.settings && route.settings.useSpecificName
				? route.name as string
				: parentName ? `${parentName}${seperator}${route.name}` : route.name as string;

			let routePath = parentRoute ? `${parentRoute}/${routeValue}` : routeValue;
			if (routePath.indexOf("//") >= 0) {
				routePath = string.replaceAll(routePath, "//", "/");
			}

			this.routeRecognizer.add({
				path: routePath,
				handler: { name: routeName },
				caseSensitive: route.caseSensitive === true
			} as ConfigurableRoute);

			if (route.settings && route.settings.childRoutes) {
				this.map(route.settings.childRoutes, routeName, routePath);
			}
		}
	}

	generate(name: string, params: Object = {}): string {
		return this.routeRecognizer.generate(name, params);
	}

}