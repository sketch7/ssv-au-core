import { LoggerFactory } from "../logging/index";
import { Log } from "../index";

export function getMockLoggerFactory(): LoggerFactory {
	const factoryMock = jest.fn<LoggerFactory>(() => ({
		get: jest.fn<Log>(() => ({
			debug: jest.fn(),
			info: jest.fn(),
			warn: jest.fn(),
			error: jest.fn()
		}))
	}));
	return new factoryMock();
}
