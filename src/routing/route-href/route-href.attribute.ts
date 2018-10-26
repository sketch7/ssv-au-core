import { autoinject } from "aurelia-dependency-injection";
import { bindable, customAttribute } from "aurelia-templating";

import { LoggerFactory, ILog } from "../../logging/index";
import { RouteMapper } from "../route-mapper";

@autoinject
@customAttribute("ssv-route-href")
export class RouteHrefAttribute {

	@bindable({ primaryProperty: true, changeHandler: "processChange" })
	route: string | undefined;

	@bindable({ changeHandler: "processChange" })
	params: Object | undefined;

	@bindable() attribute = "href";

	private logger: ILog;

	constructor(
		private element: Element,
		private router: RouteMapper,
		loggerFactory: LoggerFactory
	) {
		this.logger = loggerFactory.get("ssv-route-href");
	}

	bind() {
		this.processChange();
	}

	attributeChanged(_value: any, previous: any) {
		if (previous) {
			this.element.removeAttribute(previous);
		}

		this.processChange();
	}

	processChange() {
		if (!this.route) {
			return;
		}

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