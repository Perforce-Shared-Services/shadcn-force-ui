import { Button } from "@/angular-ui/button"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle
} from "@/angular-ui/item"
import { Component } from "@angular/core"

@Component({
  selector: "preview-item-demo",
  standalone: true,
  imports: [Item, ItemMedia, ItemContent, ItemTitle, ItemDescription, ItemActions, Button],
  template: `<div class="flex w-full max-w-md flex-col gap-6">
    <div uiItem variant="outline">
      <div uiItemContent>
        <div uiItemTitle>Basic Item</div>
        <p uiItemDescription>A simple item with title and description.</p>
      </div>
      <div uiItemActions>
        <button uiButton variant="outline" size="sm">Action</button>
      </div>
    </div>
    <a href="#" uiItem variant="outline" size="sm">
      <div uiItemMedia>
        <svg class="size-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M421-389l-98-98q-9-9-22-9t-23 10q-9 9-9 22t9 22l122 123q9 9 21 9t21-9l239-239q10-10 10-23t-10-23q-10-9-23.5-8.5T635-603L421-389Zm59 309q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-156t86-127Q252-817 325-848.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 82-31.5 155T763-197.5q-54 54.5-127 86T480-80Zm0-60q142 0 241-99.5T820-480q0-142-99-241t-241-99q-141 0-240.5 99T140-480q0 141 99.5 240.5T480-140Zm0-340Z"/></svg>
      </div>
      <div uiItemContent>
        <div uiItemTitle>Your profile has been verified.</div>
      </div>
      <div uiItemActions>
        <svg class="size-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M530-481 353-658q-9-9-8.5-21t9.5-21q9-9 21.5-9t21.5 9l198 198q5 5 7 10t2 11q0 6-2 11t-7 10L396-261q-9 9-21 8.5t-21-9.5q-9-9-9-21.5t9-21.5l176-176Z"/></svg>
      </div>
    </a>
  </div>`
})
export class ItemDemoComponent {}

export default ItemDemoComponent
