import { Disposable } from "aurelia-binding";

// todo: remove when merged https://github.com/aurelia/binding/pull/580
/**
 * Observes property changes.
 */
export interface PropertyObserver<T> {
	/**
 	* Subscribe to property change events.
 	*/
	subscribe(callback: (newValue: T, oldValue: T) => void): Disposable;
}