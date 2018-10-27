import { EventAggregator } from "aurelia-event-aggregator";

import { Store } from "./store";

interface AppState {
	hero: HeroState;
}

interface HeroState {
	name: string;
	strength: number;
}

describe("Store", () => {

	let SUT: Store<AppState>;

	beforeEach(() => {
		SUT = new Store<AppState>(new EventAggregator());
	});

	describe("initializeSpecs", () => {
		it("should rehydrate state successfully", () => {
			SUT.initialize({ hero: { name: "Goku", strength: 23 } });
		});
	});


	describe("given a state", () => {
		beforeEach(() => {
			SUT.initialize({ hero: { name: "Vegeta", strength: 19 } });
		});

		describe("when trying to retrieve data", () => {
			it("should return data from the state", () => {
				const result = SUT.get("hero");
				expect(result).not.toBe(null);
				expect(result!.name).toBe("Vegeta");
			});

			it("should return all the state", () => {
				const result = SUT.getState();
				expect(result).not.toBe(null);
				expect(result!.hero.name).toBe("Vegeta");
			});

			it("should subscribe and receive updates", () => {
				const callback = jasmine.createSpy("callback");
				SUT.subscribe("hero", callback);

				expect(callback).toHaveBeenCalledWith(jasmine.objectContaining({ name: "Vegeta", strength: 19 }));

				SUT.set("hero", { name: "Freeza", strength: 2 });

				expect(callback).toHaveBeenCalledTimes(2);
				expect(callback).toHaveBeenCalledWith(jasmine.objectContaining({ name: "Freeza", strength: 2 }));
			});
		});

		describe("when trying to save data within the store", () => {
			it("should save successfully", () => {
				SUT.set("hero", { name: "Freeza", strength: 12 });
				const result = SUT.get("hero");
				expect(result).not.toBe(null);
				expect(result!.name).toBe("Freeza");
			});
		});

	});

});