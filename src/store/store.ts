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

	set<TStateKey extends keyof TAppState>(key: TStateKey, changes: Partial<TAppState[TStateKey]>): void {
		this.state = Object.assign({}, this.state, { [key as string]: changes });
		this.eventAggregator.publish(`${stateChanged}${key}`, this.get(key));
	}

	getState() {
		return this.state;
	}

	get<TStateKey extends keyof TAppState>(key: TStateKey): TAppState[TStateKey] {
		return _.get<TAppState[TStateKey]>(_.pick(this.state, key), key) as TAppState[TStateKey];
	}

	subscribe<TStateKey extends keyof TAppState>(key: TStateKey, callback: (state: TAppState[TStateKey]) => void): Subscription {
		callback(this.get(key));
		return this.eventAggregator.subscribe(`${stateChanged}${key}`, (state: TAppState[TStateKey]) => callback(state));
	}

}