export const routeActiveConfig: RouteActiveConfig = {
	activeClass: "active",
	attribute: "href",
	matchExact: true
};

export interface RouteActiveConfig {
	activeClass: string;
	attribute: string;
	matchExact: boolean;
}