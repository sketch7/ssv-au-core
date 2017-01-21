import { FrameworkConfiguration } from "aurelia-framework";

export * from "./logging/index";
export * from "./routing/index";

export function configure(aurelia: FrameworkConfiguration) {
	aurelia.globalResources("./routing/route-href.attribute");
}
