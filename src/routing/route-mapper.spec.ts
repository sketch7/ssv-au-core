import { RouteConfig } from "aurelia-router";
import { RouteRecognizer } from "aurelia-route-recognizer";

import { RouteMapper } from "./route-mapper";

const secondaryRoutes: RouteConfig[] = [
	{
		route: "",
		title: "Components",
		name: "component-layout",
		nav: false,
		settings: {}
	},
	{
		route: "create",
		title: "Components Create",
		name: "component-create",
		nav: false,
		settings: { useSpecificName: true }
	},
	{
		route: "/:component",
		title: "Components Detail",
		name: "component-detail",
		nav: false,
		settings: { notUsed: true }
	},
];

const primaryRoutes: RouteConfig[] = [
	{
		route: ["", "home"],
		title: "Home",
		name: "home",
		nav: false,
		settings: {}
	}, {
		route: "components",
		title: "Components",
		name: "components",
		nav: true,
		settings: {
			childRoutes: secondaryRoutes
		}
	}
];

describe("RouteMapper", () => {

	let SUT: RouteMapper;

	beforeEach(() => {
		SUT = new RouteMapper(new RouteRecognizer());
	});

	describe("mapSpecs", () => {
		it("should add routes successfully", () => {
			SUT.map(primaryRoutes);
		});

	});


	describe("given a generate route", () => {
		beforeEach(() => {
			SUT.map(primaryRoutes);
		});

		describe("when a routeName contains more than one name", () => {
			it("should generate a specific url", () => {
				let result = SUT.generate("home");
				expect(result).toBe("/");
			});
		});

		describe("when route exists in a child router", () => {

			it("should generate a url with parameters", () => {
				let result = SUT.generate("components.component-detail", {
					component: "input"
				});
				expect(result).toBe("/components/input");
			});

			it("should generate a url using 'useSpecificName' feature", () => {
				let result = SUT.generate("component-create");
				expect(result).toBe("/components/create");
			});
		});

	});


});