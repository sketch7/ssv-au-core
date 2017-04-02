import { getLogger } from "aurelia-logging";

import { ILog } from "./logging.model";
import { Log } from "./logger.service";

export class LoggerFactory {

	get(sourceId: string): ILog {
		const logger = getLogger(sourceId);
		return new Log(logger);
	}

}