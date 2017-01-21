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

	describe("generateUrlSpecs", () => {

		describe("given an existing secondary route", () => {
			beforeEach(() => {
				SUT.map(primaryRoutes);
			});

			it("should generate url with data interpolated", () => {
				let result = SUT.generate("components.component-detail", {
					component: "input"
				});
				expect(result).toBe("/components/input");
			});

			it("should generate url with a specific name only", () => {
				let result = SUT.generate("component-create", {});
				expect(result).toBe("/components/create");
			});
		});

	});


});