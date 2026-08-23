import { Component } from "@angular/core"

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/angular-ui/combobox"

// apps/v4/examples/base/combobox-auto-highlight.tsx — `autoHighlight` anchors the
// highlight on the first match as the user types.
const frameworks = ["Next.js", "SvelteKit", "Nuxt.js", "Remix", "Astro"]

@Component({
  selector: "preview-combobox-auto-highlight",
  standalone: true,
  imports: [Combobox, ComboboxInput, ComboboxContent, ComboboxEmpty, ComboboxList, ComboboxItem],
  template: `
    <div uiCombobox [autoHighlight]="true" class="w-full max-w-xs">
      <div uiComboboxInput placeholder="Select a framework" />
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
export class ComboboxAutoHighlightComponent {
  readonly frameworks = frameworks
}

export default ComboboxAutoHighlightComponent
