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
	private isActive = false;

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
		this.isActive = true;
		// this.processChange();
	}

	attached() {
		this.logger.debug("attached", "init", { element: this.element, route: this.route, params: this.params });
		this.processChange();
	}


	unbind() {
		this.isActive = false;
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
		const href = this.router.generate(this.route, this.params);
		this.logger.debug("processChange", "route generated", href);
		this.element.setAttribute(this.attribute, href);
		// return this.router.ensureConfigured()
		// 	.then(() => {
		// 		if (!this.isActive) {
		// 			return null;
		// 		}

		// 		let href = this.router.generate(this.route, this.params);
		// 		this.element.setAttribute(this.attribute, href);
		// 		return null;
		// 	}).catch(reason => {
		// 		logger.error(reason);
		// 	});
	}
}