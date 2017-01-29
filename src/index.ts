import { FrameworkConfiguration } from "aurelia-framework";
import { RouteMapper, routeActiveConfig } from "./routing/index";
import { CoreConfig } from "./core.config";

export * from "./platform/index";
export * from "./logging/index";
export * from "./routing/index";
export * from "./store/index";

export * from "./core.config";

export function configure(frameworkConfig: FrameworkConfiguration, config: CoreConfig): Promise<void> {
	frameworkConfig.singleton(RouteMapper);
	frameworkConfig.globalResources([
		"./routing/route-active/route-active.attribute",
		"./routing/route-href/route-href.attribute"
	]);

	Object.assign(routeActiveConfig, config.routeActive);
	return Promise.resolve();
}