import { Component, signal } from "@angular/core"

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/angular-ui/combobox"

// apps/v4/examples/base/combobox-clear.tsx — preselected value with a clear
// button (`showClear`).
const frameworks = ["Next.js", "SvelteKit", "Nuxt.js", "Remix", "Astro"]

@Component({
  selector: "preview-combobox-clear",
  standalone: true,
  imports: [Combobox, ComboboxInput, ComboboxContent, ComboboxEmpty, ComboboxList, ComboboxItem],
  template: `
    <div uiCombobox [(value)]="value" class="w-full max-w-xs">
      <div uiComboboxInput placeholder="Select a framework" showClear />
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
export class ComboboxClearComponent {
  readonly frameworks = frameworks
  readonly value = signal<string | null>("Next.js")
}

export default ComboboxClearComponent
