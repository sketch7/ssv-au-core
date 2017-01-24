import * as _ from "lodash";
import { autoinject } from "aurelia-dependency-injection";
import { EventAggregator, Subscription } from "aurelia-event-aggregator";
import { bindable, customAttribute } from "aurelia-templating";

import { LoggerFactory, ILog } from "../logging/index";
import { LocationService } from "../platform/index";
import { RouteMapper } from "./route-mapper";

@autoinject
@customAttribute("ssv-route-active")
export class RouteActiveAttribute {

	@bindable({ primaryProperty: true, changeHandler: "attributeChanged" })
	cssclass = "active";

	@bindable({ changeHandler: "attributeChanged" }) attribute = "href";
	@bindable({ changeHandler: "attributeChanged" }) url: string;
	@bindable({ changeHandler: "attributeChanged" }) route: string;
	@bindable({ changeHandler: "attributeChanged" }) params: Object | undefined;

	private logger: ILog;
	private subscription$$: Subscription;

	constructor(
		private element: Element,
		private service: LocationService,
		private routeMapper: RouteMapper,
		private eventAggregator: EventAggregator,
		loggerFactory: LoggerFactory
	) {
		this.logger = loggerFactory.get("ssv-route-active");
	}

	bind() {
		this.setActiveRoute();
		this.subscription$$ = this.eventAggregator.subscribe("router:navigation:complete", this.setActiveRoute.bind(this));
	}

	unbind() {
		this.subscription$$.dispose();
	}

	attributeChanged() {
		this.setActiveRoute();
	}

	setActiveRoute() {
		let link = this.getLink();

		if (!link) {
			return;
		}

		const currentPath = this.service.getPathName();

		if (!_.includes(currentPath, link)) {
			this.element.classList.remove(this.cssclass);
			return;
		}

		this.element.classList.add(this.cssclass);
	}

	private getLink() {
		if (this.element.hasAttribute(this.attribute)) {
			return this.element.getAttribute(this.attribute) !;
		}
		if (this.url) {
			return this.url;
		}
		if (this.route) {
			try {
				return this.routeMapper.generate(this.route, this.params);
			} catch (error) {
				this.logger.error("getLink", "route generated failed", {
					route: this.route,
					params: this.params,
					error
				});
				return null;
			}
		}
		this.logger.warn("getLink", "requires either 'href attribute' or 'url' or 'route with optional params'");
		return null;
	}

}
