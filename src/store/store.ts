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

	set<TState extends keyof TAppState>(stateName: TState, partialState: Partial<TAppState[TState]>): void {
		this.state = Object.assign({}, this.state, { [stateName as string]: partialState });
		this.eventAggregator.publish(`${stateChanged}${stateName}`, this.get(stateName));
	}

	getState() {
		return this.state;
	}

	get<TState extends keyof TAppState>(stateName: TState): TAppState[TState] {
		return _.get<TAppState[TState]>(_.pick(this.state, stateName), stateName) as TAppState[TState];
	}

	subscribe<TState extends keyof TAppState>(stateName: TState, callback: (state: TAppState[TState]) => void): Subscription {
		callback(this.get(stateName));
		return this.eventAggregator.subscribe(`${stateChanged}${stateName}`, (state: TAppState[TState]) => callback(state));
	}

}