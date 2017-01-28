import * as _ from "lodash";
import { autoinject } from "aurelia-dependency-injection";
import { EventAggregator, Subscription } from "aurelia-event-aggregator";
import { bindable, customAttribute } from "aurelia-templating";

import { LoggerFactory, ILog } from "../../logging/index";
import { LocationService } from "../../platform/index";
import { RouteMapper } from "../route-mapper";
import { RouteActiveConfig } from "./route-active.config";

@autoinject
@customAttribute("ssv-route-active")
export class RouteActiveAttribute {

	@bindable({ primaryProperty: true, changeHandler: "attributeChanged" })
	activeClass: string;

	@bindable({ changeHandler: "attributeChanged" }) matchExact: boolean;
	@bindable({ changeHandler: "attributeChanged" }) attribute: string;
	@bindable({ changeHandler: "attributeChanged" }) url: string;
	@bindable({ changeHandler: "attributeChanged" }) route: string;
	@bindable({ changeHandler: "attributeChanged" }) params: Object | undefined;

	private logger: ILog;
	private subscription$$: Subscription;
	private config: RouteActiveConfig;

	constructor(
		private element: Element,
		private service: LocationService,
		private routeMapper: RouteMapper,
		private eventAggregator: EventAggregator,
		private defaults: RouteActiveConfig,
		loggerFactory: LoggerFactory
	) {
		this.logger = loggerFactory.get("ssv-route-active");
	}

	bind() {
		this.setDefaults();
		this.setActiveRoute();
		this.subscription$$ = this.eventAggregator.subscribe("router:navigation:complete", this.setActiveRoute.bind(this));
	}

	unbind() {
		this.subscription$$.dispose();
	}

	attributeChanged() {
		this.setDefaults();
		this.setActiveRoute();
	}

	setActiveRoute(): void {
		const link = this.getLink();

		if (!link) {
			return;
		}

		const currentPath = this.service.getPathName();
		const isMatch = this.config.matchExact
			? currentPath === link
			: !_.includes(currentPath, link);

		if (!isMatch) {
			this.element.classList.remove(this.config.activeClass);
			return;
		}

		this.element.classList.add(this.config.activeClass);
	}

	private setDefaults(): void {
		this.config = _.defaults<RouteActiveConfig>({
			activeClass: this.activeClass,
			attribute: this.attribute
		}, this.defaults);
	}

	private getLink(): string | null {
		if (this.element.hasAttribute(this.config.attribute)) {
			return this.element.getAttribute(this.config.attribute) !;
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
