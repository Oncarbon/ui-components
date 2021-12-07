# @oncarbon/ui-components

[Oncarbon](https://oncarbon.app) UI components is a UI component library containing components to display and visualize data from the Oncarbon Flights API.

These components are designed to be used in traditional frontend view libraries/frameworks (such as [Stencil](https://stenciljs.com/), React, Angular, or Vue), or on their own through traditional JavaScript in the browser.

## Features

- Tiny, highly optimized components built with [Stencil](https://stenciljs.com/)
- No build or compiling required
- Simply add the static files to any project
- Lazy-loaded components without configuration

## Components

The package consists of following components:

- [`onc-flight-itinerary-info`](./src/components/flight-itinerary-info/readme.md)
- [`onc-flight-itinerary-info-popover`](./src/components/flight-itinerary-info-popover/readme.md)

## How to use

### Vanilla HTML

Easiest way to start using the components is by adding a script tag to the CDN:

```html
<script
  type="module"
  src="https://cdn.jsdelivr.net/npm/@oncarbon/ui-components/dist/oncarbon/oncarbon.esm.js"
></script>
<script
  nomodule
  src="https://cdn.jsdelivr.net/npm/@oncarbon/ui-components/dist/oncarbon/oncarbon.js"
></script>
```

Any Oncarbon UI component added to the webpage will automatically load. This includes writing the component tag directly in HTML, or using JavaScript such as `document.createElement('onc-flight-itinerary-info')`.

Additionally, within this package is a `dist/oncarbon.js` file and accompanying `dist/oncarbon/` directory. These are the same files which are used by the CDN, and they're available in this package so they can be apart of an app's local development.

### Framework Bindings

The `@oncarbon/ui-components` package can be used in simple HTML, or by vanilla JavaScript without any framework at all. Framework specific packages that make it easier to integrate into a framework's traditional ecosystem and patterns are coming soon.

In the meantime, the components can be used with any framework by importing and running the loader before the components are used, and then use them as regular HTML elements:

```ts
// main.js/ts
import { defineCustomElements } from "@oncarbon/ui-components/loader";

defineCustomElements();

// Initialize the application

// some-component.js/ts
render() {
  return (
    <div>
      <onc-flight-itinerary-info-popover oncarbon-id="1234">
    </div>
  );
}
```
