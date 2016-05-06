// import "aurelia-polyfills";
import {RouteBuilder, Route} from "./route-builder.srv";
import {LogService, ILog} from "../logging/logging";

// beforeEach(JasminePromiseMatchers.install);
// afterEach(JasminePromiseMatchers.uninstall);

let simpleRouteStructure: Route[] = [
	{
		key: "home",
		model: {
			route: ""
		}
	}, {
		key: "admin",
		model: {
			route: "administration"
		}
	}, {
		key: "profile",
		model: {
			route: "user"
		}
	}, {
		key: "language",
		model: {
			route: ":language"
		}
	},
];

let complexRouteStructure: Route[] = [
	{
		key: "home",
		model: {
			route: ""
		}
	}, {
		key: "admin",
		model: {
			route: "administration"
		}
	}, {
		key: "user-groups",
		parentKey: "admin",
		model: {
			route: "user-groups"
		}
	}, {
		key: "user-groups-detail",
		parentKey: "user-groups",
		model: {
			route: ":userGroup"
		}
	}
];


describe("RouteBuilderSpecs", () => {

	let SUT: RouteBuilder;
	let logging: ILog;

	beforeEach(() => {
		let logService = jasmine.createSpyObj<LogService>("logService", ["getLogger"]);
		logging = jasmine.createSpyObj("logging", ["debug", "error", "warn"]);
		(<jasmine.Spy>logService.getLogger).and.returnValue(logging);

		SUT = new RouteBuilder(logService);
	});

	describe("mapSpecs", () => {

		it("should add route successfully", () => {
			SUT.map([
				{
					key: "register",
					model: null,
				}
			]);
		});

	});

	describe("generateUrlSpecs", () => {

		describe("given a simple structure", () => {

			beforeEach(() => {
				SUT.map(simpleRouteStructure);
			});

			it("should generate url from route correctly", () => {
				let result = SUT.generateUrl("profile");
				expect(result).toBe("/user");
			});

			describe("when the route is blank", () => {

				it("should be empty", () => {
					let result = SUT.generateUrl("home");
					expect(result).toBe("/");
				});
			});

		});

		describe("given a route with param", () => {

			beforeEach(() => {
				SUT.map(simpleRouteStructure);
			});

			it("should generate url with data interpolated", () => {
				const routeParams = [{ key: ":language", value: "en" }];
				let result = SUT.generateUrl("language", routeParams);
				expect(result).toBe("/en");
			});

			describe("when the params are not provided", () => {

				it("should throw error", () => {
					expect(() => SUT.generateUrl("language"))
						.toThrowError();
				});
			});

		});

		describe("given a route with parent", () => {

			beforeEach(() => {
				SUT.map(complexRouteStructure);
			});

			describe("when having one level parent", () => {

				it("should generate url with parent", () => {
					// let result = SUT.generateUrl("admin.user-groups");
					let result = SUT.generateUrl("user-groups");
					expect(result).toBe("/administration/user-groups");
				});

			});

			describe("when having a param", () => {

				it("should generate url with parent and param", () => {
					const routeParams = [{ key: ":userGroup", value: "core" }];
					let result = SUT.generateUrl("user-groups-detail", routeParams);
					expect(result).toBe("/administration/user-groups/core");

				});

			});

		});


	});

});