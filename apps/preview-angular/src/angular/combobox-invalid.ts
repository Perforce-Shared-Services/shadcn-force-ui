import { Component } from "@angular/core"

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/angular-ui/combobox"

// apps/v4/examples/base/combobox-invalid.tsx — `aria-invalid` styles the field
// for form-validation states.
const frameworks = ["Next.js", "SvelteKit", "Nuxt.js", "Remix", "Astro"]

@Component({
  selector: "preview-combobox-invalid",
  standalone: true,
  imports: [Combobox, ComboboxInput, ComboboxContent, ComboboxEmpty, ComboboxList, ComboboxItem],
  template: `
    <div uiCombobox class="w-full max-w-xs">
      <div uiComboboxInput placeholder="Select a framework" aria-invalid="true" />
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
export class ComboboxInvalidComponent {
  readonly frameworks = frameworks
}

export default ComboboxInvalidComponent
