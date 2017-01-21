// reference: https://github.com/heruan/aurelia-route-mapper/blob/master/src/route-mapper.ts

import { RouteConfig } from "aurelia-router";
import { RouteRecognizer, ConfigurableRoute } from "aurelia-route-recognizer";

export class RouteMapper extends RouteRecognizer {

	constructor() {
		super();
	}

	map(routes: RouteConfig[], parentName = "", parentRoute = ""): void {
		routes.forEach(config => {
			const name = parentName ? `${parentName}/${config.name}` : config.name;
			const path = parentRoute + config.route;
			this.add({
				path: path,
				handler: { name: name },
				caseSensitive: config.caseSensitive === true
			} as ConfigurableRoute);
			if (config.settings && config.settings.childRoutes) {
				this.map(config.settings.childRoutes, name, path);
			}
		});
	}

}