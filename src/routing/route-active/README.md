[routemapper]: ../README.md
[routehref]: ../route-href/README.md

# Route Active
Compares the passed route with the actual current route location and toggle's `css class` accordingly.
Works great with [route-href][routehref] attribute.

## Prerequisites
[Route Mapper][routemapper] is required to eager loading whole route hierarchy.

## Global Configuration
During plugin registry optional global configuration can be passed.

Available configuration for `routeActive` are:

 Name           | Type        | Default |
|---------------|-------------|---------|
| activeClass   | string      | active  |
| attribute     | string      | href    |
| matchExact    | boolean     | false   |


```ts
import { CoreConfig } from "@ssv/au-core";

export function configure(aurelia: Aurelia) {

     // configure global configuration (optional)
	const coreGlobalConfig: CoreConfig = {
		routeActive: { activeClass: "selected" }
	};

	aurelia.use
		.standardConfiguration()
		...
		.plugin("@ssv/au-core", coreGlobalConfig);
}
```

## Usage

Simple usage
```ts
<a href="..." ssv-route-active >my route</a>
```

Simple usage with overriding current active class value.
```ts
<a href="..." ssv-route-active="selected" >my route</a>
```

Overriding active class and usage on different element.
```html
<ul>
	<li repeat.for="route of routes" ssv-route-active="active-class: selected; route.bind: route.routeName; params.bind: route.params">
		<a ssv-route-href="route.bind: route.routeName; params.bind: route.params">${route.label}</a>
	</li>
</ul>
```


### Parameters

One of the below Parameters is required
- Url
- Route (with optional params)
- attribute: this attributed used directly on `anchor` link.

| Name          | Type        | Default | Usage    | Description                                                      |
|---------------|-------------|---------|----------|------------------------------------------------------------------|
| url           | string      |         | required | actual url need to be passed                                     |
| route         | string      |         | required | route name with optional route                                   |
| params        | string      |         | optional |                                                                  |
| activeClass   | string      | active  | optional |                                                                  |
| attribute     | string      | href    | optional |                                                                  |
| matchExact    | boolean     | false   | optional | if contains all the passed uri or it need's to match exactly     |

