import { Component, signal } from "@angular/core"

import { Button } from "@/angular-ui/button"
import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuRoot,
  DropdownMenuTrigger,
} from "@/angular-ui/dropdown-menu"

// apps/v4/examples/base/dropdown-menu-radio-icons.tsx
const svg = (d: string) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="${d}"/></svg>`

const CREDIT_CARD = svg("M880-740v520q0 24-18 42t-42 18H140q-24 0-42-18t-18-42v-520q0-24 18-42t42-18h680q24 0 42 18t18 42ZM140-631h680v-109H140v109Zm0 129v282h680v-282H140Zm0 282v-520 520Z")
const WALLET = svg("M240-160q-66 0-113-47T80-320v-320q0-66 47-113t113-47h480q66 0 113 47t47 113v320q0 66-47 113t-113 47H240Zm0-470h480q29 0 54.5 9t45.5 26v-45q0-42-29-71t-71-29H240q-42 0-71 29t-29 71v45q20-17 45.5-26t54.5-9Zm-97 136 477 115q7 2 14.5.5T647-385l160-134q-13-23-36-37t-51-14H240q-35 0-62 21.5T143-494Z")
const BANK = svg("M212-271v-279q0-12.75 8.68-21.38 8.67-8.62 21.5-8.62 12.82 0 21.32 8.62 8.5 8.63 8.5 21.38v279q0 12.75-8.68 21.37-8.67 8.63-21.5 8.63-12.82 0-21.32-8.63-8.5-8.62-8.5-21.37Zm242 0v-279q0-12.75 8.68-21.38 8.67-8.62 21.5-8.62 12.82 0 21.32 8.62 8.5 8.63 8.5 21.38v279q0 12.75-8.68 21.37-8.67 8.63-21.5 8.63-12.82 0-21.32-8.63-8.5-8.62-8.5-21.37ZM110-121q-12.75 0-21.37-8.68-8.63-8.67-8.63-21.5 0-12.82 8.63-21.32Q97.25-181 110-181h740q12.75 0 21.38 8.68 8.62 8.67 8.62 21.5 0 12.82-8.62 21.32-8.63 8.5-21.38 8.5H110Zm578-150v-279q0-12.75 8.68-21.38 8.67-8.62 21.5-8.62 12.82 0 21.32 8.62 8.5 8.63 8.5 21.38v279q0 12.75-8.68 21.37-8.67 8.63-21.5 8.63-12.82 0-21.32-8.63-8.5-8.62-8.5-21.37Zm166-369H103q-9.58 0-16.29-6.71Q80-653.42 80-663v-17q0-6 3.5-11.5T92-700l358-204q14.17-8 30-8t30 8l357 203q6 4 9.5 10t3.5 13.5v10.23q0 11.59-7.47 19.43Q865.05-640 854-640Z")

@Component({
  selector: "preview-dropdown-menu-radio-icons",
  standalone: true,
  imports: [
    Button,
    DropdownMenuRoot,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
  ],
  template: `<div uiDropdownMenuRoot>
    <button uiButton variant="outline" uiDropdownMenuTrigger>Payment Method</button>
    <div uiDropdownMenuContent class="min-w-56">
      <div uiDropdownMenuGroup>
        <div uiDropdownMenuLabel>Select Payment Method</div>
        <div uiDropdownMenuRadioGroup [(value)]="paymentMethod">
          <button uiDropdownMenuRadioItem value="card">
            <svg aria-hidden="true" focusable="false" [innerHTML]="card"></svg>
            Credit Card
          </button>
          <button uiDropdownMenuRadioItem value="paypal">
            <svg aria-hidden="true" focusable="false" [innerHTML]="wallet"></svg>
            PayPal
          </button>
          <button uiDropdownMenuRadioItem value="bank">
            <svg aria-hidden="true" focusable="false" [innerHTML]="bank"></svg>
            Bank Transfer
          </button>
        </div>
      </div>
    </div>
  </div>`,
})
export class DropdownMenuRadioIconsComponent {
  protected readonly card = CREDIT_CARD
  protected readonly wallet = WALLET
  protected readonly bank = BANK

  protected readonly paymentMethod = signal("card")
}

export default DropdownMenuRadioIconsComponent
