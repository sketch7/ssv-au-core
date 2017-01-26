export class RouteActiveConfig {
	static defaults = new RouteActiveConfig();

	activeClass = "active";
	attribute = "href";
	matchExact = false;
}

export interface RouteActiveConfigOptions {
	activeClass?: string;
	attribute?: string;
	matchExact?: boolean;
}