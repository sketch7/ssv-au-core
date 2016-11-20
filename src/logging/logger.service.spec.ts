import { LogService } from "./logger.service";

describe("LogService", () => {

	let SUT = new LogService();

	describe("when getLogger is invoked", () => {

		it("should return a new logger instance", () => {

			const logger = SUT.getLogger("Xyz");
			expect(logger).toBeDefined();
		});

	});
});