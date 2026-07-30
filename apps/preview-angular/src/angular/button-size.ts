import { Component } from "@angular/core"
import { ButtonComponent } from "@/angular-ui/button"

@Component({
  selector: "preview-button-size",
  standalone: true,
  imports: [ButtonComponent],
  template: `
    <div class="flex flex-col items-start gap-8 sm:flex-row">
      <div class="flex items-start gap-2">
        <button uiButton size="sm" variant="outline">Small</button>
        <button uiButton size="icon-sm" variant="outline" aria-label="Submit">
          <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
            <path d="M440-80v-647L256-543l-56-57 280-280 280 280-56 57-184-184v647h-80Z"/>
          </svg>
        </button>
      </div>
      <div class="flex items-start gap-2">
        <button uiButton variant="outline">Default</button>
        <button uiButton size="icon" variant="outline" aria-label="Submit">
          <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
            <path d="M440-80v-647L256-543l-56-57 280-280 280 280-56 57-184-184v647h-80Z"/>
          </svg>
        </button>
      </div>
      <div class="flex items-start gap-2">
        <button uiButton size="lg" variant="outline">Large</button>
        <button uiButton size="icon-lg" variant="outline" aria-label="Submit">
          <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
            <path d="M440-80v-647L256-543l-56-57 280-280 280 280-56 57-184-184v647h-80Z"/>
          </svg>
        </button>
      </div>
    </div>
  `,
})
export default class ButtonSizeComponent {}
