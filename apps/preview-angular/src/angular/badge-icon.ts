import { Component } from "@angular/core"
import { BadgeComponent } from "@/angular-ui/badge"

@Component({
  selector: "preview-badge-icon",
  standalone: true,
  imports: [BadgeComponent],
  template: `
    <div class="flex flex-wrap gap-2">
      <span uiBadge variant="success">
        <svg data-icon="inline-start" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
          <path d="M421-380 319-482q-7-7-17-7t-17 7q-7 7-7 17t7 17l115 116q9 9 20 9t20-9l232-232q7-7 7-17t-7-17q-7-7-17-7t-17 7L421-380ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/>
        </svg>
        Synced
      </span>
      <span uiBadge variant="info">
        Syncing
        <svg data-icon="inline-end" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
          <path d="M480-80q-82 0-155-31.5T198-197q-54-54-86-127T80-480q0-17 11.5-28.5T120-520q17 0 28.5 11.5T160-480q0 133 93.5 226.5T480-160q133 0 226.5-93.5T800-480q0-133-93.5-226.5T480-800q-17 0-28.5-11.5T440-840q0-17 11.5-28.5T480-880q82 0 155 31.5t127 85.5q54 54 86 127t32 156q0 82-32 155t-86 127q-54 54-127 85.5T480-80Z"/>
        </svg>
      </span>
    </div>
  `,
})
export default class BadgeIconComponent {}
