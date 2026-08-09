import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/angular-ui/card"
import { Component } from "@angular/core"

@Component({
  selector: "preview-card-small",
  standalone: true,
  imports: [Card, CardHeader, CardTitle, CardDescription, CardContent],
  template: `<div uiCard size="sm" class="w-full max-w-sm">
    <div uiCardHeader>
      <h3 uiCardTitle>Workspace settings</h3>
      <p uiCardDescription>Manage how this workspace syncs.</p>
    </div>
    <div uiCardContent>
      <p class="text-sm text-muted-foreground">Compact size card.</p>
    </div>
  </div>`,
})
export class CardSmallComponent {}

export default CardSmallComponent
