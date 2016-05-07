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
			route: "admin"
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
			route: "admin"
		}
	}, {
		key: "user-groups",
		parentKey: "admin",
		model: {
			route: "user-groups"
		}
	}, {
		key: "admin.users",
		model: {
			route: "users"
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

		describe("given already exists key", () => {

			it("should throw an error", () => {

				expect(() => {
					SUT.map([{
						key: "parent",
						model: null
					}, {
							key: "parent",
							model: null,
						}
					]);
				}).toThrowError();

			});
		});

		describe("given key with dot notation", () => {

			it("should register as parent", () => {
				SUT.map([{
					key: "language",
					model: null
				}, {
						key: "language.admin",
						model: null,
					}
				]);

				expect(SUT.get("language")).toBeDefined();
				expect(SUT.get("language.admin")).toBeDefined();
				expect(SUT.get("language.admin").parentKey).toBe("language");
			});

			describe("when the parentKey is specified", () => {

				it("should use the parent from the parentKey provided", () => {
					SUT.map([{
						key: "language",
						model: null
					}, {
							key: "language.admin",
							model: null,
						}, {
							key: "admin.user-groups",
							parentKey: "language.admin",
							model: null,
						}
					]);

					expect(SUT.get("language.admin")).toBeDefined();
					expect(SUT.get("admin.user-groups").parentKey).toBe("language.admin");
				});
			});
		});

	});


	describe("generateUrlSpecs", () => {

		describe("given a non existing route", () => {

			beforeEach(() => {
				SUT.map(simpleRouteStructure);
			});

			it("should throw error", () => {
				expect( () => {
					SUT.generateUrl("not-found");
				}).toThrowError();
			});
		});

		describe("given a simple structure", () => {

			beforeEach(() => {
				SUT.map(simpleRouteStructure);
			});

			it("should generate url from route correctly", () => {
				let result = SUT.generateUrl("profile");
				expect(result).toBe("/user");
			});

			describe("when the route is blank", () => {

				it("should be '/'", () => {
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

			it("should generate url with parent", () => {
				let result = SUT.generateUrl("user-groups");
				expect(result).toBe("/admin/user-groups");
			});

			describe("when having parent registered with dot", () => {

				it("should generate url with parent", () => {
					let result = SUT.generateUrl("admin.users");
					expect(result).toBe("/admin/users");
				});

			});

			describe("when having a param", () => {

				it("should generate url with parent and param", () => {
					const routeParams = [{ key: ":userGroup", value: "core" }];
					let result = SUT.generateUrl("user-groups-detail", routeParams);
					// let result = SUT.generateUrl("user-groups-detail", {
					// 	userGroup: "core"
					// });
					expect(result).toBe("/admin/user-groups/core");

				});

			});

		});
	});

});