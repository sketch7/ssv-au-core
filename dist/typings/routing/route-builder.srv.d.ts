import { RouteConfig } from "aurelia-router";
import { LogService } from "../logging/logging";
export declare class RouteBuilder {
    private logger;
    private routes;
    constructor(logService: LogService);
    map(routes: Route[]): void;
    get(key: string): Route;
    generateUrl(key: string, data?: any): string;
    verify(): void;
    private verifyParent(route);
    private validate(route);
    private buildRoutePath(menuItem, routePath, data?);
    private extractParentKey(route);
}
export interface Route {
    key: string;
    model: RouteConfig;
    parentKey?: string;
}
export interface RouteParams {
    key: string;
    value: string;
}
