export interface RouteMapperSettings {
	useSpecificName?: boolean;
	childRoutes?: RouteConfig[];
}

export interface RouteConfig {
	route: string | string[];
	name?: string;
	title?: string;
	caseSensitive?: boolean;
	settings?: RouteMapperSettings;
}