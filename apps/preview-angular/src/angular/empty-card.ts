import { Button } from "@/angular-ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/angular-ui/empty"
import { Component } from "@angular/core"

@Component({
  selector: "preview-empty-card",
  standalone: true,
  imports: [Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription, EmptyContent, Button],
  template: ` <div uiEmpty>
    <div uiEmptyHeader>
      <div uiEmptyMedia variant="icon">
        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M140-160q-24 0-42-18.5T80-220v-520q0-23 18-41.5t42-18.5h256q12.44 0 23.72 5t19.37 13.09L481-740h339q23 0 41.5 18.5T880-680v460q0 23-18.5 41.5T820-160H140Zm0-60h680v-460H456l-60-60H140v520Zm0 0v-520 520Z" /></svg>
      </div>
      <h3 uiEmptyTitle>No projects yet</h3>
      <p uiEmptyDescription>
        You haven't created any projects yet. Get started by creating your
        first project.
      </p>
    </div>
    <div uiEmptyContent>
      <div class="flex gap-2">
        <a href="#" uiButton>Create project</a>
        <button uiButton variant="outline">Import project</button>
      </div>
      <a href="#" uiButton variant="link" class="text-muted-foreground">
        Learn more
        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M700-658 223-181q-9 9-21 9t-21-9q-9-9-9-21t9-21l477-477H394q-13 0-21.5-8.5T364-730q0-13 8.5-21.5T394-760h336q13 0 21.5 8.5T760-730v336q0 13-8.5 21.5T730-364q-13 0-21.5-8.5T700-394v-264Z" /></svg>
      </a>
    </div>
  </div>`,
})
export class EmptyCardComponent {}

export default EmptyCardComponent
