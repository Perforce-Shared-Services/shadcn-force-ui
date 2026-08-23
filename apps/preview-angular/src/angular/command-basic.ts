import { Component , signal } from "@angular/core"

import { Button } from "@/angular-ui/button"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/angular-ui/command"

@Component({
  selector: "preview-command-basic",
  standalone: true,
  imports: [Button, Command, CommandDialog, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem],
  template: `
    <div class="flex flex-col gap-4">
      <button uiButton variant="outline" class="w-fit" (click)="open.set(true)">
        Open Menu
      </button>
      <ui-command-dialog [(uiOpen)]="open">
        <ng-template>
          <div uiCommand>
            <div uiCommandInput placeholder="Type a command or search..."></div>
            <div uiCommandList>
              <div uiCommandEmpty>No results found.</div>
              <div uiCommandGroup heading="Suggestions">
                <div uiCommandItem (select)="open.set(false)">Calendar</div>
                <div uiCommandItem (select)="open.set(false)">Search Emoji</div>
                <div uiCommandItem (select)="open.set(false)">Calculator</div>
              </div>
            </div>
          </div>
        </ng-template>
      </ui-command-dialog>
    </div>
  `,
})
export class CommandBasicComponent {
  protected readonly open = signal(false)
}

export default CommandBasicComponent
