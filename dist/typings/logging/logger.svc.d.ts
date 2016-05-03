export declare class LogService {
    getLogger(sourceId: string): ILog;
}
export declare class Log implements ILog {
    private logger;
    constructor(logger: any);
    debug(method: string, message?: string, data?: any): void;
    info(method: string, message?: string, data?: any): void;
    warn(method: string, message?: string, data?: any): void;
    error(method: string, message?: string, data?: any): void;
    private log(type, method, message?, data?);
    private buildLogMessage(method, message?);
}
export interface ILog {
    debug(method: string, message?: string, data?: any): void;
    info(method: string, message?: string, data?: any): void;
    warn(method: string, message?: string, data?: any): void;
    error(method: string, message?: string, data?: any): void;
}
