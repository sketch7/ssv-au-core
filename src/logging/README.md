# Logger
A minimal logger which uses aurelia logger.

## Usage

```ts
import { LoggerFactory, ILog } from "@ssv/au-core";

const id = "auth.service";

@autoinject
export class AuthService {
	
	private logger: ILog;
	
	constructor(
		loggerFactory: LoggerFactory
	) {
		this.logger = loggerFactory.get(id);
	}
	
	login() {
		this.logger.debug("login", "msg goes here");
	}

}
```