import { Directive } from '@angular/core';

export { RdxSelectComponent as SelectComponent } from '@radix-ng/primitives/select';

/**
 * Angular port of @force-ui/select (radix-force-ui style) — the root.
 *
 * Unlike the directive-based radix primitives (accordion / radio / checkbox),
 * radix-ng ships the select root as a *component* (`RdxSelectComponent` — it owns
 * the CDK overlay template that portals the dropdown). A component can't be
 * attached via `hostDirectives`, and subclassing it to rename the selector is
 * not viable: radix-ng builds the root on signal-based queries
 * (`contentChild.required` / `viewChild.required`) which are not reliably
 * inherited across a `@Component` subclass — the required queries come up empty
 * and throw NG0951. A projecting wrapper also breaks the parts'
 * `inject(RdxSelectComponent)` (projected content's injector is its declaration
 * site, not the wrapper's view).
 *
 * So the root is radix-ng's component used directly, re-exported as `Select` and
 * applied with its native `[rdxSelect]` selector. This keeps the part directives
 * (`[rdxSelectTrigger]` / `[rdxSelectContent]` / `[rdxSelectItem]` / …) as **direct
 * logical children of the `[rdxSelect]` element**, so their
 * `inject(RdxSelectComponent)` resolves the real instance. `SelectRootDirective`
 * stamps the registry's `data-slot="select"` onto every `[rdxSelect]` for parity.
 *
 * API: selection is `[value]` + `(onValueChange)` (radix-ng exposes no
 * `valueChange`, so no `[(value)]`). `[matchTriggerWidth]="true"` sizes the
 * dropdown to the trigger.
 *
 * INITIAL selection: use `defaultValue="x"` (uncontrolled), NOT a static
 * `value="x"` attribute. radix-ng's `value` setter runs `selectValue` eagerly —
 * a static `value` attr is applied during directive instantiation, before the
 * content query resolves, and the required `content()` signal throws NG0951 and
 * crashes the render. `defaultValue` is applied in the root's ngAfterContentInit
 * (content ready), so it's safe. A `[value]` BINDING is also safe (set on the
 * first CD pass), though an empty controlled `[value]=""` logs one benign,
 * caught `content().options.find` console error on init.
 *
 * Usage:
 *   <div rdxSelect [value]="theme" (onValueChange)="theme = $event" [matchTriggerWidth]="true">
 *     <button rdxSelectTrigger><span rdxSelectValue placeholder="Select a theme"></span></button>
 *     <div rdxSelectContent>
 *       <button rdxSelectItem value="light">Light</button>
 *       <button rdxSelectItem value="dark">Dark</button>
 *     </div>
 *   </div>
 *
 * Accessibility comes from radix-ng: the trigger is `role="combobox"` with
 * `aria-expanded`, the content is `role="listbox"`, items are `role="option"`
 * with `aria-selected`, arrow keys move an active-descendant highlight. Give the
 * trigger an accessible name (visible label via `aria-labelledby`, or `aria-label`).
 */
@Directive({
  selector: '[rdxSelect]',
  standalone: true,
  host: {
    'data-slot': 'select',
  },
})
export class SelectRootDirective {
  // Marker only — co-applies with radix-ng's RdxSelectComponent on the same
  // `[rdxSelect]` element to add the registry's `data-slot="select"`. The host
  // binding does the work.
}
