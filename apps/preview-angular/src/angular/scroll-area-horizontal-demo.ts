import { Component } from "@angular/core"

import { ScrollArea } from "@/angular-ui/scroll-area"

interface Artwork {
  artist: string
  art: string
}

const works: Artwork[] = [
  {
    artist: "Ornella Binni",
    art: "https://images.unsplash.com/photo-1465869185982-5a1a7522cbcb?auto=format&fit=crop&w=300&q=80",
  },
  {
    artist: "Tom Byrom",
    art: "https://images.unsplash.com/photo-1548516173-3cabfa4607e9?auto=format&fit=crop&w=300&q=80",
  },
  {
    artist: "Vladimir Malyavko",
    art: "https://images.unsplash.com/photo-1494337480532-3725c85fd2ab?auto=format&fit=crop&w=300&q=80",
  },
]

// The React example renders an explicit <ScrollBar orientation="horizontal" />;
// the Angular port scrolls natively so the themed browser scrollbar appears on
// the overflow axis without a sub-component.
@Component({
  selector: "preview-scroll-area-horizontal-demo",
  standalone: true,
  imports: [ScrollArea],
  template: `<div uiScrollArea orientation="horizontal" class="w-96 rounded-md border whitespace-nowrap">
    <div class="flex w-max space-x-4 p-4">
      @for (artwork of works; track artwork.artist) {
        <figure class="shrink-0">
          <div class="overflow-hidden rounded-md">
            <img
              [src]="artwork.art"
              [alt]="'Photo by ' + artwork.artist"
              class="aspect-[3/4] h-fit w-fit object-cover"
              width="300"
              height="400"
            />
          </div>
          <figcaption class="pt-2 text-xs text-muted-foreground">
            Photo by
            <span class="font-semibold text-foreground">{{ artwork.artist }}</span>
          </figcaption>
        </figure>
      }
    </div>
  </div>`,
})
export class ScrollAreaHorizontalDemoComponent {}

export default ScrollAreaHorizontalDemoComponent
