import { FrameworkConfiguration } from "aurelia-framework";
import { RouteMapper } from "./routing/index";

export * from "./platform/index";
export * from "./logging/index";
export * from "./routing/index";
export * from "./store/index";

export function configure(config: FrameworkConfiguration) {
	config.singleton(RouteMapper);
	config.globalResources("./routing/route-active.attribute");
	config.globalResources("./routing/route-href.attribute");
}
