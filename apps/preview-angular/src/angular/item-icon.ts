import { Button } from "@/angular-ui/button"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/angular-ui/item"
import { Component } from "@angular/core"

@Component({
  selector: "preview-item-icon",
  standalone: true,
  imports: [
    Button,
    Item,
    ItemMedia,
    ItemContent,
    ItemTitle,
    ItemDescription,
    ItemActions,
  ],
  template: `<div class="flex w-full max-w-lg flex-col gap-6">
    <div uiItem variant="outline">
      <div uiItemMedia variant="icon">
        <svg
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -960 960 960"
        >
          <path
            d="M426-190v-196l-170 98q-20 11-41 6t-32-25q-11-20-6-41.5t25-32.5l170-99-169-98q-20-11-25.5-32.5T183-652q11-20 32-25t41 6l170 98v-197q0-23 15.5-38.5T480-824q23 0 38.5 15.5T534-770v197l170-98q20-11 41-6t32 25q11 20 5.5 41.5T757-578l-169 98 170 99q20 11 25 32.5t-6 41.5q-11 20-32 25t-41-6l-170-98v196q0 23-15.5 38.5T480-136q-23 0-38.5-15.5T426-190Z"
          />
        </svg>
      </div>
      <div uiItemContent>
        <div uiItemTitle>Security Alert</div>
        <p uiItemDescription>New login detected from unknown device.</p>
      </div>
      <div uiItemActions>
        <button uiButton variant="outline" size="sm">Review</button>
      </div>
    </div>
  </div>`,
})
export class ItemIconComponent {}

export default ItemIconComponent
