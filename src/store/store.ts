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

	// set(stateName: keyof TAppState, partialState: {  [P in keyof TAppState]: TAppState[P]}): void {
	set<TState>(stateName: keyof TAppState, partialState: TState): void {
		this.state = Object.assign({}, this.state, { [stateName]: partialState });
		this.eventAggregator.publish(`${stateChanged}${stateName}`, this.get<TState>(stateName));
	}

	getState() {
		return this.state;
	}

	get<TState>(stateName: keyof TAppState) {
		return _.get(_.pick(this.state, stateName), stateName) as TState;
	}

	subscribe<TState>(stateName: keyof TAppState, callback: (state: TState) => void): Subscription {
		callback(this.get<TState>(stateName));
		return this.eventAggregator.subscribe(`${stateChanged}${stateName}`, (state: TState) => callback(state));
	}

}