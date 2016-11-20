import { LoggerFactory } from "./logger.factory";

describe("LoggerFactory", () => {

	const SUT = new LoggerFactory();

	describe("when get is invoked", () => {
		it("should return a new logger instance", () => {
			const logger = SUT.get("Xyz");
			expect(logger).toBeDefined();
		});
	});
});