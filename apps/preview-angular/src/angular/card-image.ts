import { Badge } from "@/angular-ui/badge"
import { Button } from "@/angular-ui/button"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/angular-ui/card"
import { Component } from "@angular/core"

// apps/v4/examples/base/card-image.tsx
@Component({
  selector: "preview-card-image",
  standalone: true,
  imports: [Badge, Button, Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle],
  template: `<div uiCard class="relative mx-auto w-full max-w-sm pt-0">
    <div class="absolute inset-0 z-30 aspect-video bg-black/35"></div>
    <img
      src="https://avatar.vercel.sh/shadcn1"
      alt="Event cover"
      class="relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40"
    />
    <div uiCardHeader>
      <div uiCardAction><span uiBadge variant="secondary">Featured</span></div>
      <h3 uiCardTitle>Design systems meetup</h3>
      <p uiCardDescription>
        A practical talk on component APIs, accessibility, and shipping faster.
      </p>
    </div>
    <div uiCardFooter><button uiButton class="w-full">View Event</button></div>
  </div>`,
})
export class CardImageComponent {}

export default CardImageComponent
