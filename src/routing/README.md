# Route Mapper
Route mapper eager load all aurelia route hierarchy. This needs to be combined with Aurelia router.

## Usage
```ts
// Enabling specific route name
{
    route: "components",
    title: "Components",
    name: "components",
    moduleId: `app/components/component-layout`,
    nav: true,
    settings: { useSpecificName: true }
}

// Associating childRoutes to a parent route.
{
    route: "components",
    title: "Components",
    name: "components",
    moduleId: `app/components/component-layout`,
    nav: true,
    settings: { childRoutes: componentRoutes }
}
```
## Parameters
Parameters need to be set within `route settings` property.

| Name            | Type            | Default | Required | Description                                                                                                                    |
|-----------------|-----------------|---------|----------|--------------------------------------------------------------------------------------------------------------------------------|
| useSpecificName | `boolean`       | false   | no       | `true`: exact route name need to be used as `route` for route recognition else it need all parent keys attached as route name. |
| childRoutes     | `RouteConfig[]` | -       | no*      | child routes for the current route.                                                                                            |

*no**: *required when the `route` has `childRoutes`.
 
***
 

# Utils

### Method:  `setRouteDefaults`

#### Parameters:

| Name     | Type                   | Default                                   | Required | Description                                                        |
|----------|------------------------|-------------------------------------------|----------|--------------------------------------------------------------------|
| route    | `RouteConfig`          | -                                         | yes      | current route.                                                     |
| specific | `Partial<RouteConfig>` | `{ settings: { useSpecificName: true } }` | no       | specific configuration which will overrides current configuration. |

```ts
import { setRouteDefaults } from "@ssv/au-core";

// By default it will go through all routes and set `useSpecificName` value to `true`.
export const shellRoutes: RouteConfig[] = [
    {
        route: ["", "home"],
        title: "Home",
        name: "home",
        moduleId: `app/home/home`,
        nav: false,
        settings: { }
    }, {
        route: "components",
        title: "Components",
        name: routes.componentsRoot,
        moduleId: `app/components/component-layout`,
        nav: true,
        settings: { childRoutes: componentRoutes }
    }
].map(x => setRouteDefaults(x));

// This will go through all routes and overrides specific configuration
export const shellRoutes: RouteConfig[] = [
    {
        route: ["", "home"],
        title: "Home",
        name: "home",
        moduleId: `app/home/home`,
        nav: false,
        settings: { }
    }, {
        route: "components",
        title: "Components",
        name: routes.componentsRoot,
        moduleId: `app/components/component-layout`,
        nav: true,
        settings: { childRoutes: componentRoutes }
    }
].map(x => setRouteDefaults(x, { nav: false, caseSensitive: false}));

```