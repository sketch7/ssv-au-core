import * as _ from "lodash";
import { RouteConfig } from "./route-mapper.model";

const defaultConfig = { settings: { useSpecificName: true } };
export function setRouteDefaults(route: RouteConfig, specific?: Partial<RouteConfig>) {

	route = _.defaultsDeep<Partial<RouteConfig> | undefined, RouteConfig>(specific, defaultConfig, route);

	if (!route.title) {
		route.title = typeof route.route === "string"
			? _.startCase(route.route)
			: _.startCase(route.route[1]);
	}

	return route;
};