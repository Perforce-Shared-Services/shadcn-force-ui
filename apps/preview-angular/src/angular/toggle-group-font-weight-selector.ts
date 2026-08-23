import { ToggleGroup, ToggleGroupItem } from "@/angular-ui/toggle-group"
import { Field, FieldLabel } from "@/angular-ui/field"
import { Component } from "@angular/core"

@Component({
  selector: "preview-toggle-group-font-weight-selector",
  standalone: true,
  imports: [ToggleGroup, ToggleGroupItem, Field, FieldLabel],
  template: ` <div uiField class="w-fit">
    <label uiFieldLabel>Font Weight</label>
    <div uiToggleGroup variant="outline" value="normal" size="lg" class="gap-2">
      <button
        uiToggleGroupItem
        value="light"
        aria-label="Light"
        class="flex size-16 flex-col items-center justify-center rounded-xl"
      >
        <span class="text-2xl leading-none font-light">Aa</span>
        <span class="text-xs text-muted-foreground">Light</span>
      </button>
      <button
        uiToggleGroupItem
        value="normal"
        aria-label="Normal"
        class="flex size-16 flex-col items-center justify-center rounded-xl"
      >
        <span class="text-2xl leading-none font-normal">Aa</span>
        <span class="text-xs text-muted-foreground">Normal</span>
      </button>
      <button
        uiToggleGroupItem
        value="bold"
        aria-label="Bold"
        class="flex size-16 flex-col items-center justify-center rounded-xl"
      >
        <span class="text-2xl leading-none font-bold">Aa</span>
        <span class="text-xs text-muted-foreground">Bold</span>
      </button>
    </div>
  </div>`,
})
export class ToggleGroupFontWeightSelectorComponent {}

export default ToggleGroupFontWeightSelectorComponent
