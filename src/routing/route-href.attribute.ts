import { autoinject } from "aurelia-dependency-injection";
import { bindable, customAttribute } from "aurelia-templating";

import { LoggerFactory, ILog } from "../logging/index";
import { RouteMapper } from "./route-mapper";

@autoinject
@customAttribute("ssv-route-href")
export class RouteHrefAttribute {

	@bindable({ changeHandler: "processChange" })
	route: string;

	@bindable({ changeHandler: "processChange" })
	params: any;

	@bindable({ defaultValue: "href" })
	attribute: string;

	private logger: ILog;

	constructor(
		private element: Element,
		private router: RouteMapper,
		loggerFactory: LoggerFactory
	) {
		this.logger = loggerFactory.get("ssv-route-href");
		this.logger.debug("ctor");
	}

	bind() {
		this.logger.debug("bind", "init", { element: this.element, route: this.route, params: this.params });
		this.processChange();
	}

	attributeChanged(value: any, previous: any) {
		this.logger.debug("attributeChanged", "init", { element: this.element, value: value, previous: previous });
		if (previous) {
			this.element.removeAttribute(previous);
		}

		this.processChange();
	}

	processChange() {
		this.logger.debug("processChange", "init", { element: this.element, route: this.route, params: this.params });
		try {
			const href = this.router.generate(this.route, this.params);
			this.element.setAttribute(this.attribute, href);
		} catch (error) {
			this.logger.error("processChange", "route generated failed", {
				route: this.route,
				params: this.params,
				error
			});
		}
	}
}