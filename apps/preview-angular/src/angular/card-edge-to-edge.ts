import { Button } from "@/angular-ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/angular-ui/card"
import { Component } from "@angular/core"

// apps/v4/examples/base/card-edge-to-edge.tsx
@Component({
  selector: "preview-card-edge-to-edge",
  standalone: true,
  imports: [Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle],
  template: `<div uiCard class="mx-auto w-full max-w-sm">
    <div uiCardHeader>
      <h3 uiCardTitle>Terms of Service</h3>
      <p uiCardDescription>Review the terms before accepting the agreement.</p>
    </div>
    <div uiCardContent class="-mb-(--card-spacing)">
      <div
        class="-mx-(--card-spacing) max-h-48 space-y-4 overflow-y-scroll border-t bg-muted/50 px-(--card-spacing) py-4 text-sm leading-relaxed"
      >
        <p>
          These terms govern your use of the workspace, including access to
          shared documents, project files, and collaboration tools.
        </p>
        <p>
          You are responsible for the content you upload and for ensuring that
          your team has the appropriate permissions to view or edit it.
        </p>
        <p>
          We may update features or limits as the service evolves. When those
          changes materially affect your workflow, we will notify your workspace
          administrators.
        </p>
        <p>
          By continuing, you agree to keep your account credentials secure and
          to follow your organization's acceptable use policies.
        </p>
      </div>
    </div>
    <div uiCardFooter class="justify-end gap-2">
      <button uiButton variant="outline">Decline</button>
      <button uiButton>Accept</button>
    </div>
  </div>`,
})
export class CardEdgeToEdgeComponent {}

export default CardEdgeToEdgeComponent
