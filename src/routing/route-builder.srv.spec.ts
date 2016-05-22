import "aurelia-polyfills";
import {RouteBuilder, Route} from "./route-builder.srv";
import {LogService, ILog} from "../logging/logging";


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
	}, {
		key: "multi-route",
		model: {
			route: ["", "dashboard"]
		}
	}, {
		key: "slash",
		model: {
			route: "/"
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
					model: {
						route: "register"
					},
				}
			]);
		});

		describe("given already exists key", () => {

			it("should throw an error", () => {
				expect(() => {
					SUT.map([{
						key: "parent",
						model: {
							route: "admin"
						},
					}, {
							key: "parent",
							model: {
								route: "register"
							},
						}
					]);
				}).toThrowError();
			});
		});

		describe("given an empty key", () => {

			it("should throw an error", () => {
				expect(() => {
					SUT.map([{
						key: "",
						model: {
							route: ""
						}
					}]);
				}).toThrowError();
			});
		});

		describe("given an undefined route", () => {

			it("should throw an error", () => {
				expect(() => {
					SUT.map([{
						key: "undefined-route",
						model: {
							route: undefined
						}
					}]);
				}).toThrowError();
			});
		});

		describe("given key with dot notation", () => {

			it("should register as parent", () => {
				SUT.map([{
					key: "language",
					model: {
						route: ""
					}
				}, {
						key: "language.admin",
						model: {
							route: "/admin"
						}
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
						model: {
							route: ":language"
						}
					}, {
							key: "language.admin",
							model: {
								route: "/admin"
							}
						}, {
							key: "admin.user-groups",
							parentKey: "language.admin",
							model: {
								route: "/user-groups"
							}
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
				expect(() => {
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

			describe("when the route is '/'", () => {

				it("should be '/'", () => {
					let result = SUT.generateUrl("slash");
					expect(result).toBe("/");
				});
			});

		});

		describe("given route with multiple routes", () => {

			beforeEach(() => {
				SUT.map(simpleRouteStructure);
			});

			it("should generate url from first index", () => {
				let result = SUT.generateUrl("multi-route");
				expect(result).toBe("/");
			});

		});

		describe("given a route with param", () => {

			beforeEach(() => {
				SUT.map(simpleRouteStructure);
			});

			it("should generate url with data interpolated", () => {
				let result = SUT.generateUrl("language", {
					language: "en"
				});
				expect(result).toBe("/en");
			});

			describe("when the params are not provided", () => {

				it("should throw error", () => {
					expect(() => SUT.generateUrl("language"))
						.toThrowError();
				});
			});

			describe("when the params are not provided correctly", () => {

				it("should throw error", () => {
					expect(() => SUT.generateUrl("language", {
						langauge: "en"
					})).toThrowError();
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
					let result = SUT.generateUrl("user-groups-detail", {
						userGroup: "core"
					});
					expect(result).toBe("/admin/user-groups/core");
				});

			});

		});
	});


	describe("verifySpecs", () => {
		describe("given all parents are valid", () => {

			beforeEach(() => {
				SUT.map([{
					key: "admin",
					model: {
						route: "admin"
					},
				}, {
						key: "users",
						parentKey: "admin",
						model: {
							route: "register"
						},
					}
				]);
			});

			describe("when the verify is invoked", () => {
				it("should be successful", () => {
					SUT.verify();
				});
			});

		});

		describe("given a parent which doesn't exists", () => {

			beforeEach(() => {
				SUT.map([{
					key: "admin",
					model: {
						route: "admin"
					},
				}, {
						key: "users",
						parentKey: "admin-invalid",
						model: {
							route: "register"
						},
					}
				]);
			});

			describe("when the verify is invoked", () => {
				it("should throw an error", () => {
					expect(() => {
						SUT.verify();
					}).toThrowError(`Parent 'admin-invalid' not found for route key 'users'`);
				});
			});

		});
	});

});