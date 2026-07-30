import { Component } from "@angular/core"
import {
  CardComponent, CardContentComponent, CardDescriptionComponent,
  CardHeaderComponent, CardTitleComponent,
} from "@/angular-ui/card"

@Component({
  selector: "preview-card-small",
  standalone: true,
  imports: [CardComponent, CardHeaderComponent, CardTitleComponent, CardDescriptionComponent, CardContentComponent],
  template: `
    <div uiCard size="sm" class="w-full max-w-sm">
      <div uiCardHeader>
        <h3 uiCardTitle>Workspace settings</h3>
        <p uiCardDescription>Manage how this workspace syncs.</p>
      </div>
      <div uiCardContent>
        <p class="text-muted-foreground text-sm">Compact size card with reduced spacing.</p>
      </div>
    </div>
  `,
})
export default class CardSmallComponent {}
