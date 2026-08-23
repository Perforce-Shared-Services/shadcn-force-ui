import { Component, signal } from "@angular/core"

import { Button } from "@/angular-ui/button"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@/angular-ui/command"

const USER_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M372-523q-42-42-42-108t42-108q42-42 108-42t108 42q42 42 42 108t-42 108q-42 42-108 42t-108-42ZM160-220v-34q0-38 19-65t49-41q67-30 128.5-45T480-420q62 0 123 15.5T731-360q31 14 50 41t19 65v34q0 25-17.5 42.5T740-160H220q-25 0-42.5-17.5T160-220Zm60 0h520v-34q0-16-9.5-30.5T707-306q-64-31-117-42.5T480-360q-57 0-111 11.5T252-306q-14 7-23 21.5t-9 30.5v34Zm324.5-346.5Q570-592 570-631t-25.5-64.5Q519-721 480-721t-64.5 25.5Q390-670 390-631t25.5 64.5Q441-541 480-541t64.5-25.5ZM480-631Zm0 411Z"/></svg>`
const CREDIT_CARD_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M880-740v520q0 24-18 42t-42 18H140q-24 0-42-18t-18-42v-520q0-24 18-42t42-18h680q24 0 42 18t18 42ZM140-631h680v-109H140v109Zm0 129v282h680v-282H140Zm0 282v-520 520Z"/></svg>`
const SETTINGS_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M421-80q-14 0-25-9t-13-23l-15-94q-19-7-40-19t-37-25l-86 40q-14 6-28 1.5T155-226L97-330q-8-13-4.5-27t15.5-23l80-59q-2-9-2.5-20.5T185-480q0-9 .5-20.5T188-521l-80-59q-12-9-15.5-23t4.5-27l58-104q8-13 22-17.5t28 1.5l86 40q16-13 37-25t40-18l15-95q2-14 13-23t25-9h118q14 0 25 9t13 23l15 94q19 7 40.5 18.5T669-710l86-40q14-6 27.5-1.5T804-734l59 104q8 13 4.5 27.5T852-580l-80 57q2 10 2.5 21.5t.5 21.5q0 10-.5 21t-2.5 21l80 58q12 8 15.5 22.5T863-330l-58 104q-8 13-22 17.5t-28-1.5l-86-40q-16 13-36.5 25.5T592-206l-15 94q-2 14-13 23t-25 9H421Zm15-60h88l14-112q33-8 62.5-25t53.5-41l106 46 40-72-94-69q4-17 6.5-33.5T715-480q0-17-2-33.5t-7-33.5l94-69-40-72-106 46q-23-26-52-43.5T538-708l-14-112h-88l-14 112q-34 7-63.5 24T306-642l-106-46-40 72 94 69q-4 17-6.5 33.5T245-480q0 17 2.5 33.5T254-413l-94 69 40 72 106-46q24 24 53.5 41t62.5 25l14 112Zm44-210q54 0 92-38t38-92q0-54-38-92t-92-38q-54 0-92 38t-38 92q0 54 38 92t92 38Zm0-130Z"/></svg>`

@Component({
  selector: "preview-command-shortcuts",
  standalone: true,
  imports: [
    Button,
    Command,
    CommandDialog,
    CommandInput,
    CommandList,
    CommandEmpty,
    CommandGroup,
    CommandItem,
    CommandShortcut,
  ],
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
              <div uiCommandGroup heading="Settings">
                <div uiCommandItem (select)="open.set(false)">
                  <span class="[&_svg]:size-4 [&_svg]:fill-current" [innerHTML]="user"></span>
                  <span>Profile</span>
                  <span uiCommandShortcut>&#8984;P</span>
                </div>
                <div uiCommandItem (select)="open.set(false)">
                  <span class="[&_svg]:size-4 [&_svg]:fill-current" [innerHTML]="creditCard"></span>
                  <span>Billing</span>
                  <span uiCommandShortcut>&#8984;B</span>
                </div>
                <div uiCommandItem (select)="open.set(false)">
                  <span class="[&_svg]:size-4 [&_svg]:fill-current" [innerHTML]="settings"></span>
                  <span>Settings</span>
                  <span uiCommandShortcut>&#8984;S</span>
                </div>
              </div>
            </div>
          </div>
        </ng-template>
      </ui-command-dialog>
    </div>
  `,
})
export class CommandWithShortcutsComponent {
  protected readonly open = signal(false)
  private readonly user = USER_SVG
  private readonly creditCard = CREDIT_CARD_SVG
  private readonly settings = SETTINGS_SVG
}

export default CommandWithShortcutsComponent
