import { FrameworkConfiguration } from "aurelia-framework";
import { RouteMapper, routeActiveConfig } from "./routing/index";
import { CoreConfig } from "./config.model";

export function configure(frameworkConfig: FrameworkConfiguration, config: CoreConfig): Promise<void> {
	frameworkConfig.singleton(RouteMapper);
	frameworkConfig.globalResources([
		"./routing/route-active/route-active.attribute",
		"./routing/route-href/route-href.attribute"
	]);

	Object.assign(routeActiveConfig, config.routeActive);
	return Promise.resolve();
}