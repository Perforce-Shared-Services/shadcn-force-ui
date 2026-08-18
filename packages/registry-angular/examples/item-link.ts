import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/ui/item"
import { Component } from "@angular/core"

@Component({
  selector: "preview-item-link",
  standalone: true,
  imports: [Item, ItemContent, ItemTitle, ItemDescription, ItemActions],
  template: `<div class="flex w-full max-w-md flex-col gap-4">
    <a uiItem href="#">
      <div uiItemContent>
        <div uiItemTitle>Visit our documentation</div>
        <p uiItemDescription>Learn how to get started with our components.</p>
      </div>
      <div uiItemActions>
        <svg
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -960 960 960"
          class="size-4"
        >
          <path
            d="M530-481 353-658q-9-9-8.5-21t9.5-21q9-9 21.5-9t21.5 9l198 198q5 5 7 10t2 11q0 6-2 11t-7 10L396-261q-9 9-21 8.5t-21-9.5q-9-9-9-21.5t9-21.5l176-176Z"
          />
        </svg>
      </div>
    </a>
    <a
      uiItem
      variant="outline"
      href="#"
      target="_blank"
      rel="noopener noreferrer"
    >
      <div uiItemContent>
        <div uiItemTitle>External resource</div>
        <p uiItemDescription>Opens in a new tab with security attributes.</p>
      </div>
      <div uiItemActions>
        <svg
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -960 960 960"
          class="size-4"
        >
          <path
            d="M180-120q-24 0-42-18t-18-42v-600q0-24 18-42t42-18h249q12.75 0 21.38 8.68 8.62 8.67 8.62 21.5 0 12.82-8.62 21.32-8.63 8.5-21.38 8.5H180v600h600v-249q0-12.75 8.68-21.38 8.67-8.62 21.5-8.62 12.82 0 21.32 8.62 8.5 8.63 8.5 21.38v249q0 24-18 42t-42 18H180Zm600-617L403-360q-9 9-21 8.5t-21-9.5q-9-9-9-21t9-21l377-377H549q-12.75 0-21.37-8.68-8.63-8.67-8.63-21.5 0-12.82 8.63-21.32 8.62-8.5 21.37-8.5h261q12.75 0 21.38 8.62Q840-822.75 840-810v261q0 12.75-8.68 21.37-8.67 8.63-21.5 8.63-12.82 0-21.32-8.63-8.5-8.62-8.5-21.37v-188Z"
          />
        </svg>
      </div>
    </a>
  </div>`,
})
export class ItemLinkComponent {}

export default ItemLinkComponent
