import { ILog } from "./logging.model";

export class Log implements ILog {

	constructor(
		private logger: any
	) {
	}

	debug(method: string, message?: string, data?: any): void {
		this.log("debug", method, message, data);
	}

	info(method: string, message?: string, data?: any): void {
		this.log("info", method, message, data);
	}

	warn(method: string, message?: string, data?: any): void {
		this.log("warn", method, message, data);
	}

	error(method: string, message?: string, data?: any): void {
		this.log("error", method, message, data);
	}

	private log(type: string, method: string, message?: string, data?: any) {
		if (data) {
			this.logger[type](`${this.buildLogMessage(method, message)}`, data);
		} else {
			this.logger[type](`${this.buildLogMessage(method, message)}`);
		}
	}

	private buildLogMessage(method: string, message?: string): string {
		if (message) {
			return `${method} :: ${message}`;
		} else {
			return `${method}`;
		}
	}
}