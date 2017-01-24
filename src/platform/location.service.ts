import { autoinject } from "aurelia-framework";

import { Location } from "./location.model";

@autoinject
export class LocationService {

	get(): Location {
		return {
			hash: window.location.hash,
			host: window.location.host,
			hostname: window.location.hostname,
			href: window.location.href,
			origin: window.location.origin,
			pathName: window.location.pathname,
			port: window.location.port,
			protocol: window.location.protocol,
			search: window.location.search
		};
	}

	getPathName(): string {
		return window.location.pathname;
	}

}