import { Item, ItemContent, ItemDescription, ItemGroup, ItemHeader, ItemTitle } from "@/angular-ui/item"
import { Component } from "@angular/core"

interface Model {
  name: string
  description: string
  image: string
}

@Component({
  selector: "preview-item-header",
  standalone: true,
  imports: [Item, ItemGroup, ItemHeader, ItemContent, ItemTitle, ItemDescription],
  template: `<div class="flex w-full max-w-xl flex-col gap-6">
    <div uiItemGroup class="grid grid-cols-3 gap-4">
      @for (model of models; track model.name) {
        <div uiItem variant="outline">
          <div uiItemHeader>
            <img
              [src]="model.image"
              [alt]="model.name"
              width="128"
              height="128"
              class="aspect-square w-full rounded-sm object-cover"
            />
          </div>
          <div uiItemContent>
            <div uiItemTitle>{{ model.name }}</div>
            <p uiItemDescription>{{ model.description }}</p>
          </div>
        </div>
      }
    </div>
  </div>`
})
export class ItemHeaderComponentDemo {
  readonly models: Model[] = [
    {
      name: "v0-1.5-sm",
      description: "Everyday tasks and UI generation.",
      image:
        "https://images.unsplash.com/photo-1650804068570-7fb2e3dbf888?q=80&w=640&auto=format&fit=crop"
    },
    {
      name: "v0-1.5-lg",
      description: "Advanced thinking or reasoning.",
      image:
        "https://images.unsplash.com/photo-1610280777472-54133d004c8c?q=80&w=640&auto=format&fit=crop"
    },
    {
      name: "v0-2.0-mini",
      description: "Open Source model for everyone.",
      image:
        "https://images.unsplash.com/photo-1602146057681-08560aee8cde?q=80&w=640&auto=format&fit=crop"
    }
  ]
}

export default ItemHeaderComponentDemo
