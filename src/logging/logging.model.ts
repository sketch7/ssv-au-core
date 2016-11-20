export interface ILog {
	debug(method: string, message?: string, data?: any): void;
	info(method: string, message?: string, data?: any): void;
	warn(method: string, message?: string, data?: any): void;
	error(method: string, message?: string, data?: any): void;
}