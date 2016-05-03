# Logger Sample

## Usage

```javascript
import {LogService, ILog} from "core/common";

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