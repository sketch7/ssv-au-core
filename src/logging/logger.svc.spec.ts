import {LogService} from "./logger.svc";


describe("LogServiceSpecs", () => {

	let SUT = new LogService();

	describe("when getLogger is invoked", () => {

		it("should return a new logger instance", () => {

			const logger = SUT.getLogger("Xyz");
			expect(logger).toBeDefined();
		});

	});
});