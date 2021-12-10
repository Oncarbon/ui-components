# @oncarbon/ui-components-angular

[Oncarbon](https://oncarbon.app) Angular specific UI components on top of [@oncarbon/ui-components](https://www.npmjs.com/package/@oncarbon/ui-components) components.

## How to use

The components are exported as an angular module.

```tsx
// my-app.module.ts
import { OncarbonModule } from "@oncarbon/ui-components-angular";

@NgModule({
  imports: [OncarbonModule],
})
export class MyAppModule {}

// my-app.component.html
<onc-flight-itinerary-info-popover itinerary-oncarbon-id="1234">
  <button>Trigger the popover</button>
</onc-flight-itinerary-info-popover>;
```

## Related

- [Oncarbon UI Components](https://www.npmjs.com/package/@oncarbon/ui-components)

## License

- [MIT](https://raw.githubusercontent.com/Oncarbon/ui-components/main/LICENSE)
