import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/angular-ui/input-group"
import { Kbd } from "@/angular-ui/kbd"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/angular-ui/empty"
import { Component } from "@angular/core"

@Component({
  selector: "preview-empty-input-group",
  standalone: true,
  imports: [Empty, EmptyHeader, EmptyTitle, EmptyDescription, EmptyContent, InputGroup, InputGroupInput, InputGroupAddon, Kbd],
  template: ` <div uiEmpty>
    <div uiEmptyHeader>
      <h3 uiEmptyTitle>404 - Not Found</h3>
      <p uiEmptyDescription>
        The page you're looking for doesn't exist. Try searching for what you
        need below.
      </p>
    </div>
    <div uiEmptyContent>
      <div uiInputGroup class="sm:w-3/4">
        <input uiInputGroupInput placeholder="Try searching for pages..." />
        <div uiInputGroupAddon>
          <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M378-329q-108.16 0-183.08-75Q120-479 120-585t75-181q75-75 181.5-75t181 75Q632-691 632-584.85 632-542 618-502q-14 40-42 75l242 240q9 8.56 9 21.78T818-143q-9 9-22.22 9-13.22 0-21.78-9L533-384q-30 26-69.96 40.5Q423.08-329 378-329Zm-1-60q81.25 0 138.13-57.5Q572-504 572-585t-56.87-138.5Q458.25-781 377-781q-82.08 0-139.54 57.5Q180-666 180-585t57.46 138.5Q294.92-389 377-389Z" /></svg>
        </div>
        <div uiInputGroupAddon align="inline-end"><kbd uiKbd>/</kbd></div>
      </div>
      <p uiEmptyDescription>
        Need help? <a href="#">Contact support</a>
      </p>
    </div>
  </div>`,
})
export class EmptyInputGroupComponent {}

export default EmptyInputGroupComponent
