import { Component, signal } from "@angular/core"

import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/angular-ui/input-group"

// Deviations from the React example (documented in the MDX):
// - the Popover around the info button needs @angular/cdk overlays (popover is
//   not yet ported); the button renders without its popup
// - useCopyToClipboard is reimplemented with the clipboard API + a signal.
@Component({
  selector: "preview-input-group-button",
  standalone: true,
  imports: [InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput],
  template: `
    <div class="grid w-full max-w-sm gap-6">
      <div uiInputGroup>
        <input uiInputGroupInput placeholder="https://x.com/shadcn" readonly />
        <div uiInputGroupAddon align="inline-end">
          <button
            uiInputGroupButton
            aria-label="Copy"
            title="Copy"
            size="icon-xs"
            (click)="copy()"
          >
            @if (isCopied()) {
              <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                <path d="m378-332 363-363q9-9 21.5-9t21.5 9q9 9 9 21.5t-9 21.5L399-267q-9 9-21 9t-21-9L175-449q-9-9-8.5-21.5T176-492q9-9 21.5-9t21.5 9l159 160Z" />
              </svg>
            } @else {
              <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                <path d="M300-200q-24 0-42-18t-18-42v-560q0-24 18-42t42-18h440q24 0 42 18t18 42v560q0 24-18 42t-42 18H300Zm0-60h440v-560H300v560ZM180-80q-24 0-42-18t-18-42v-590q0-12.75 8.68-21.38 8.67-8.62 21.5-8.62 12.82 0 21.32 8.62 8.5 8.63 8.5 21.38v590h470q12.75 0 21.38 8.68 8.62 8.67 8.62 21.5 0 12.82-8.62 21.32Q662.75-80 650-80H180Zm120-180v-560 560Z" />
              </svg>
            }
          </button>
        </div>
      </div>
      <div uiInputGroup class="[--radius:9999px]">
        <div uiInputGroupAddon>
          <button uiInputGroupButton variant="secondary" size="icon-xs" aria-label="Connection info">
            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
              <path d="M504.5-288.63q8.5-8.62 8.5-21.37v-180q0-12.75-8.68-21.38-8.67-8.62-21.5-8.62-12.82 0-21.32 8.62-8.5 8.63-8.5 21.38v180q0 12.75 8.68 21.37 8.67 8.63 21.5 8.63 12.82 0 21.32-8.63Zm-1-314.57q9.5-9.2 9.5-22.8 0-14.45-9.48-24.22-9.48-9.78-23.5-9.78t-23.52 9.78Q447-640.45 447-626q0 13.6 9.48 22.8 9.48 9.2 23.5 9.2t23.52-9.2ZM480.27-80q-82.74 0-155.5-31.5Q252-143 197.5-197.5t-86-127.34Q80-397.68 80-480.5t31.5-155.66Q143-709 197.5-763t127.34-85.5Q397.68-880 480.5-880t155.66 31.5Q709-817 763-763t85.5 127Q880-563 880-480.27q0 82.74-31.5 155.5Q817-252 763-197.68q-54 54.31-127 86Q563-80 480.27-80Zm.23-60Q622-140 721-239.5t99-241Q820-622 721.19-721T480-820q-141 0-240.5 98.81T140-480q0 141 99.5 240.5t241 99.5Zm-.5-340Z" />
            </svg>
          </button>
        </div>
        <div uiInputGroupAddon class="pl-1.5 text-muted-foreground">https://</div>
        <input uiInputGroupInput id="input-secure-19" />
        <div uiInputGroupAddon align="inline-end">
          <button uiInputGroupButton size="icon-xs" aria-label="Favorite" (click)="toggleFavorite()">
            <svg
              aria-hidden="true"
              [attr.data-favorite]="isFavorite()"
              class="data-[favorite=true]:fill-blue-600 data-[favorite=true]:stroke-blue-600"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 -960 960 960"
            >
              <path d="m323-245 157-94 157 95-42-178 138-120-182-16-71-168-71 167-182 16 138 120-42 178Zm157-24L294-157q-8 5-17 4.5t-16-5.5q-7-5-10.5-13t-1.5-18l49-212-164-143q-8-7-9.5-15.5t.5-16.5q2-8 9-13.5t17-6.5l217-19 84-200q4-9 12-13.5t16-4.5q8 0 16 4.5t12 13.5l84 200 217 19q10 1 17 6.5t9 13.5q2 8 .5 16.5T826-544L662-401l49 212q2 10-1.5 18T699-158q-7 5-16 5.5t-17-4.5L480-269Zm0-206Z" />
            </svg>
          </button>
        </div>
      </div>
      <div uiInputGroup>
        <input uiInputGroupInput placeholder="Type to search..." />
        <div uiInputGroupAddon align="inline-end">
          <button uiInputGroupButton variant="secondary">Search</button>
        </div>
      </div>
    </div>
  `,
})
export class InputGroupButtonExampleComponent {
  protected readonly isCopied = signal(false)
  protected readonly isFavorite = signal(false)

  protected copy(): void {
    navigator.clipboard?.writeText("https://x.com/shadcn").then(() => {
      this.isCopied.set(true)
      setTimeout(() => this.isCopied.set(false), 2000)
    })
  }

  protected toggleFavorite(): void {
    this.isFavorite.update((value) => !value)
  }
}

export default InputGroupButtonExampleComponent
