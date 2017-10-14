import { FrameworkConfiguration, PLATFORM } from "aurelia-framework";

import { RouteMapper, routeActiveConfig } from "./routing/index";
import { CoreConfig } from "./config.model";

export function configure(frameworkConfig: FrameworkConfiguration, config: CoreConfig): Promise<void> {
	frameworkConfig.singleton(RouteMapper);
	frameworkConfig.globalResources([
		PLATFORM.moduleName("./routing/route-active/route-active.attribute"),
		PLATFORM.moduleName("./routing/route-href/route-href.attribute")
	]);

	Object.assign(routeActiveConfig, config.routeActive);
	return Promise.resolve();
}