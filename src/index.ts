import { FrameworkConfiguration } from "aurelia-framework";
import { RouteMapper, RouteActiveConfig } from "./routing/index";
import { CoreConfig } from "./core.config";

export * from "./platform/index";
export * from "./logging/index";
export * from "./routing/index";
export * from "./store/index";

export * from "./core.config";

export function configure(frameworkConfig: FrameworkConfiguration, config: CoreConfig) {
	frameworkConfig.singleton(RouteMapper);
	frameworkConfig.globalResources("./routing/route-active.attribute");
	frameworkConfig.globalResources("./routing/route-href.attribute");

	frameworkConfig.container.registerInstance(RouteActiveConfig, Object.assign(RouteActiveConfig.defaults, config.routeActive));
}