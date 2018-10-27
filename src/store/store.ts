import _ from "lodash";
import { autoinject } from "aurelia-framework";
import { EventAggregator } from "aurelia-event-aggregator";
import { Subscription } from "./messaging.model";
const stateChanged = "state-changed:";

@autoinject
export class Store<TAppState extends object> {

	private state: TAppState | undefined;

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

	get<TStateKey extends keyof TAppState>(key: TStateKey): TAppState[TStateKey] | null {
		if (!this.state) {
			return null;
		}

		const state = _.pick<TAppState, TStateKey>(this.state, key) as TAppState;
		return _.get<TAppState, TStateKey>(state, key) as TAppState[TStateKey];
	}

	subscribe<TStateKey extends keyof TAppState>(key: TStateKey, callback: (state: TAppState[TStateKey]) => void): Subscription | null {
		const item = this.get(key);

		if (!item) {
			return null;
		}

		callback(item);
		return this.eventAggregator.subscribe(`${stateChanged}${key}`, (state: TAppState[TStateKey], _event: string) => callback(state));
	}

}