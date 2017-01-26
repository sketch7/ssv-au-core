import * as _ from "lodash";
import { autoinject } from "aurelia-framework";
import { EventAggregator } from "aurelia-event-aggregator";
import { Subscription } from "./messaging.model";

const stateChanged = "state-changed:";

@autoinject
export class Store<TAppState> {

	private state: TAppState;

	constructor(
		private eventAggregator: EventAggregator
	) {
	}

	initialize(state: TAppState): void {
		this.state = state;
	}

	set<K extends keyof TAppState>(stateName: K, partialState: Partial<TAppState[K]>): void {
		this.state = Object.assign({}, this.state, { [stateName as string]: partialState });
		this.eventAggregator.publish(`${stateChanged}${stateName}`, this.get(stateName));
	}

	getState() {
		return this.state;
	}

	get<K extends keyof TAppState>(stateName: K): TAppState[K] {
		return _.get<TAppState[K]>(_.pick(this.state, stateName), stateName) as TAppState[K];
	}

	subscribe<K extends keyof TAppState>(stateName: K, callback: (state: TAppState[K]) => void): Subscription {
		callback(this.get(stateName));
		return this.eventAggregator.subscribe(`${stateChanged}${stateName}`, (state: TAppState[K]) => callback(state));
	}

}