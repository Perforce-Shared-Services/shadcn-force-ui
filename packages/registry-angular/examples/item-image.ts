import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/ui/item"
import { Component } from "@angular/core"

const music = [
  {
    title: "Midnight City Lights",
    artist: "Neon Dreams",
    album: "Electric Nights",
    duration: "3:45",
  },
  {
    title: "Coffee Shop Conversations",
    artist: "The Morning Brew",
    album: "Urban Stories",
    duration: "4:05",
  },
  {
    title: "Digital Rain",
    artist: "Cyber Symphony",
    album: "Binary Beats",
    duration: "3:30",
  },
]

@Component({
  selector: "preview-item-image",
  standalone: true,
  imports: [Item, ItemGroup, ItemMedia, ItemContent, ItemTitle, ItemDescription],
  template: `<div class="flex w-full max-w-md flex-col gap-6">
    <div uiItemGroup class="gap-4">
      @for (song of music; track song.title) {
        <a uiItem variant="outline" href="#" role="listitem">
          <div uiItemMedia variant="image">
            <img
              [src]="'https://avatar.vercel.sh/' + song.title"
              [alt]="song.title"
              width="32"
              height="32"
              class="object-cover grayscale"
            />
          </div>
          <div uiItemContent>
            <div uiItemTitle class="line-clamp-1">
              {{ song.title }} -
              <span class="text-muted-foreground">{{ song.album }}</span>
            </div>
            <p uiItemDescription>{{ song.artist }}</p>
          </div>
          <div uiItemContent class="flex-none text-center">
            <p uiItemDescription>{{ song.duration }}</p>
          </div>
        </a>
      }
    </div>
  </div>`,
})
export class ItemImageComponent {
  protected readonly music = music
}

export default ItemImageComponent
