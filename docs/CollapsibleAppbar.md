# Collapsible Appbar

The `<pxb-collapsible-appbar>` component is an enlarged appbar that appears at the top of the page.  Whenever a user scrolls down a page, it begins a transition into a regular-sized appbar.  This is useful for screens that initially need to display more information in the header on load. 

Icons are passed in as a child element of the `<pxb-channel-value>` component.

## Usage

<div style="width: 100%; text-align: center">
    <img width="100%" style="max-width: 400px" alt="Collapsible Appbar Anatomy" src="./images/collapsibleAppbarAnatomy.png">
</div>

```typescript
// app.module.ts
import { CollapsibleAppbarModule } from '@pxblue/angular-components';
...
imports: [
    CollapsibleAppbarModule
],
```

```html
// your-component.html
<pxb-collapsible-appbar-value> // TODO
</pxb-collapsible-appbar-value>
```

## API

Parent element (`<pxb-collpasible-appbar>`) attributes:

<div style="overflow: auto;">

| @Input             | Description                                    | Type                 | Required | Default |
| ------------------ | ---------------------------------------------- | -------------------- | -------- | ------- |
| title              | Appbar header line one                         | `string`             | yes      |         |
| subtitle           | Appbar header line two                         | `string`             | yes      |         |
| info               | Appbar header line three                       | `string`             | yes      |         |
| scrollRef          | Scrollable element that header responds to     | `ElementRef`         | yes      |         | 
| maxHeaderHeight    | Header height when fully expanded              | `number`             | no       | 200     |

</div>

Background image would be provided via css
Mat icon + Right Content would be provided via ng-content
