import { Button } from "@/angular-ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/angular-ui/empty"
import { Spinner } from "@/angular-ui/spinner"
import { Component } from "@angular/core"

@Component({
  selector: "preview-spinner-empty",
  standalone: true,
  imports: [Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription, EmptyContent, Spinner, Button],
  template: ` <div uiEmpty class="w-full">
    <div uiEmptyHeader>
      <div uiEmptyMedia variant="icon"><span uiSpinner></span></div>
      <h3 uiEmptyTitle>Processing your request</h3>
      <p uiEmptyDescription>
        Please wait while we process your request. Do not refresh the page.
      </p>
    </div>
    <div uiEmptyContent>
      <button uiButton variant="outline" size="sm">Cancel</button>
    </div>
  </div>`,
})
export class SpinnerEmptyComponent {}

export default SpinnerEmptyComponent
