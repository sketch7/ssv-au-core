import { LoggerFactory } from "../logging/index";

export function getMockLoggerFactory(): LoggerFactory {
	const loggerFactory = jasmine.createSpyObj<LoggerFactory>("loggerFactory", ["get"]);
	const logging = jasmine.createSpyObj("logging", ["debug", "error", "warn"]);
	(<jasmine.Spy>loggerFactory.get).and.returnValue(logging);
	return loggerFactory;
}
