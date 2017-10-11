[routemapper]: ../README.md

# Route Href
 Generates url for the route specified.

## Prerequisites
[Route Mapper][routemapper] is required to eager load all route hierarchy.

## Usage

```html
<!-- route + params -->
<a ssv-route-href="route: hero; params.bind: {hero: 'rexxar'}">Rexxar</a>

<!-- usage with router -->
<li repeat.for="route of routes">
    <a ssv-route-href="route.bind: route.routeName; params.bind: route.params">${route.label}</a>
</li>
```

### Parameters
| Name      | Type     | Default  | Required | Description                              |
|-----------|----------|----------|----------|------------------------------------------|
| route     | `string` | -        | yes      | route name to generate url for.          |
| params    | `string` | -        | no       | params required for the specified route. |
| attribute | `string` | `"href"` | no       | attribute to use to set url in.          |