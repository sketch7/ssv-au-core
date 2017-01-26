[routemapper]: ../README.md

# Route Href
 Generates any route which is available in the whole route hierarchy.

## Prerequisites
[Route Mapper][routemapper] is required to eager loading whole route hierarchy.

## Usage

```html
<ul>
	<li repeat.for="route of routes">
		<a ssv-route-href="route.bind: route.routeName; params.bind: route.params">${route.label}</a>
	</li>
</ul>
```

### Parameters
| Name          | Type        | Default | Usage    | Description                      |
|---------------|-------------|---------|----------|----------------------------------|
| route         | string      |         | required |                                  |
| params        | string      |         | optional |                                  |
| attribute     | string      | href    | optional |                                  |