[routemapper]: ../README.md
[routehref]: ../route-href/README.md

# Route Active
Adds a CSS class to an element when the link's route becomes active.
Can be used in conjuction with [route-href][routehref] attribute.

## Prerequisites
[Route Mapper][routemapper] is required to eager load all route hierarchy.

## Global Configuration
Options which can be configured globally.

 Name           | Type        | Default |
|---------------|-------------|---------|
| activeClass   | string      | active  |
| attribute     | string      | href    |
| matchExact    | boolean     | true    |

## Usage

```html
<a href="..." ssv-route-active>my route</a>

<!-- primary binding - sets the active class name -->
<a href="..." ssv-route-active="selected" >my route</a>

<!-- using route + params, on different element -->
<li ssv-route-active="route: hero; params.bind: {hero: 'rexxar'}"></li>

<!-- using url, on different element -->
<li ssv-route-active="url: /en/heroes"></li>

<!-- passing other options -->
<a ssv-route-active="active-class: selected; match-exact: false"></a>
```

### Parameters

| Name        | Type    | Default | Required | Description                                                                   |
|-------------|---------|---------|----------|-------------------------------------------------------------------------------|
| url         | string  |         | no*      | url to match with the current url. Cannot be used in conjunction with `route` |
| route       | string  |         | no*      | route name to match. Cannot be used in conjunction with `url`                 |
| params      | string  |         | no       | params for the `route`. Only used when using the `route`                      |
| activeClass | string  | active  | no       | css class which gets added when its active                                    |
| attribute   | string  | href    | no       | attribute to be used to read url from                                         |
| matchExact  | boolean | true    | no       | determines whether the full url should match or partially                     |

*no**: *required when the attribute isn't provided, such as `href`*