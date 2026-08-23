import { Component, signal } from "@angular/core"

import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
} from "@/angular-ui/combobox"

// apps/v4/examples/base/combobox-multiple.tsx — multi-select with chips. The
// chips container is the popup anchor, so the popup tracks it as it grows.
const frameworks = ["Next.js", "SvelteKit", "Nuxt.js", "Remix", "Astro"]

@Component({
  selector: "preview-combobox-multiple",
  standalone: true,
  imports: [
    Combobox,
    ComboboxChips,
    ComboboxChip,
    ComboboxChipsInput,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxList,
    ComboboxItem,
  ],
  template: `
    <div uiCombobox [(value)]="value" [multiple]="true" [autoHighlight]="true">
      <div uiComboboxChips class="w-full max-w-xs">
        @for (v of value(); track v) {
          <span uiComboboxChip [value]="v">{{ v }}</span>
        }
        <input uiComboboxChipsInput placeholder="Add framework" />
      </div>
      <ng-template uiComboboxContent>
        <div uiComboboxEmpty>No items found.</div>
        <div uiComboboxList>
          @for (framework of frameworks; track framework) {
            <div uiComboboxItem [value]="framework">{{ framework }}</div>
          }
        </div>
      </ng-template>
    </div>
  `,
})
export class ComboboxMultipleComponent {
  readonly frameworks = frameworks
  readonly value = signal<unknown[]>(["Next.js"])
}

export default ComboboxMultipleComponent
