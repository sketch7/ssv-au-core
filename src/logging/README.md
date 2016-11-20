# Logger

## Usage

```ts
import { LogService, ILog } from "@ssv/au-core";

const id = "auth.service";

@autoinject
export class AuthService {
	
	private logger: ILog;
	
	constructor(
		logService: LogService
	) {
		this.logger = logService.getLogger(id);
	}
	
	login() {
		this.logger.debug("login", "msg goes here");
	}
	
}
```