// reference: https://github.com/heruan/aurelia-route-mapper/blob/master/src/route-mapper.ts

import { RouteConfig } from "aurelia-router";
import { RouteRecognizer, ConfigurableRoute } from "aurelia-route-recognizer";
import { string } from "@ssv/core";

import { RouteMapperSettings } from "./route-mapper.model";
const seperator = ".";

export class RouteMapper extends RouteRecognizer {

	// todo: change back to RouteConfig[]
	map(routes: any[], parentName = "", parentRoute = ""): void {
		for (let route of routes as RouteConfig[]) {

			let routeName: string;
			const routeSettings = route.settings as RouteMapperSettings;

			if (routeSettings.useSpecificName) {
				routeName = route.name as string;
			} else {
				routeName = parentName ? `${parentName}${seperator}${route.name}` : route.name as string;
			}

			let routePath = parentRoute ? `${parentRoute}/${route.route}` : `${route.route}`;
			if (routePath.indexOf("//") >= 0) {
				routePath = string.replaceAll(routePath, "//", "/");
			}

			this.add({
				path: routePath,
				handler: { name: routeName },
				caseSensitive: route.caseSensitive === true
			} as ConfigurableRoute);

			if (routeSettings.childRoutes) {
				this.map(route.settings.childRoutes, routeName, routePath);
			}
		}
	}

}