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
  CommandSeparator,
  CommandShortcut,
} from "@/angular-ui/command"

const CALENDAR_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M180-80q-24 0-42-18t-18-42v-620q0-24 18-42t42-18h65v-28q0-13.6 9-22.8 9-9.2 23.02-9.2t23.5 9.2Q310-861.6 310-848v28h340v-28q0-13.6 9-22.8 9-9.2 23.02-9.2t23.5 9.2Q715-861.6 715-848v28h65q24 0 42 18t18 42v620q0 24-18 42t-42 18H180Zm0-60h600v-430H180v430Zm0-490h600v-130H180v130Zm0 0v-130 130Zm300 230q-17 0-28.5-11.5T440-440q0-17 11.5-28.5T480-480q17 0 28.5 11.5T520-440q0 17-11.5 28.5T480-400Zm-188.5-11.5Q280-423 280-440t11.5-28.5Q303-480 320-480t28.5 11.5Q360-457 360-440t-11.5 28.5Q337-400 320-400t-28.5-11.5ZM640-400q-17 0-28.5-11.5T600-440q0-17 11.5-28.5T640-480q17 0 28.5 11.5T680-440q0 17-11.5 28.5T640-400ZM480-240q-17 0-28.5-11.5T440-280q0-17 11.5-28.5T480-320q17 0 28.5 11.5T520-280q0 17-11.5 28.5T480-240Zm-188.5-11.5Q280-263 280-280t11.5-28.5Q303-320 320-320t28.5 11.5Q360-297 360-280t-11.5 28.5Q337-240 320-240t-28.5-11.5ZM640-240q-17 0-28.5-11.5T600-280q0-17 11.5-28.5T640-320q17 0 28.5 11.5T680-280q0 17-11.5 28.5T640-240Z"/></svg>`
const SMILE_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M626-533q22.5 0 38.25-15.5T680-587q0-23-15.75-38.5T626-641q-22.5 0-38.25 15.5T572-587q0 23 15.75 38.5T626-533Zm-292 0q22.5 0 38.25-15.5T388-587q0-23-15.75-38.5T334-641q-22.5 0-38.25 15.5T280-587q0 23 15.75 38.5T334-533Zm-10 421.5Q251-143 197-197t-85.5-127Q80-397 80-480t31.5-156Q143-709 197-763t127-85.5Q397-880 480-880t156 31.5Q709-817 763-763t85.5 127Q880-563 880-480t-31.5 156Q817-251 763-197t-127 85.5Q563-80 480-80t-156-31.5ZM480-480Zm241 241q99-99 99-241t-99-241q-99-99-241-99t-241 99q-99 99-99 241t99 241q99 99 241 99t241-99Zm-241.5-22q57.5 0 106-26t78.5-72.4q6-11.6-.75-22.6-6.75-11-20.25-11H316.92q-13.92 0-20.42 11-6.5 11-.5 22.6 30 46.4 78.5 72.4 48.5 26 105 26Z"/></svg>`
const CALCULATOR_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M314-316v63q0 10.83 7.12 17.92 7.11 7.08 18 7.08 10.88 0 17.88-7.08 7-7.09 7-17.92v-63h63q10.83 0 17.92-7.12 7.08-7.11 7.08-18 0-10.88-7.08-17.88-7.09-7-17.92-7h-63v-63q0-10.83-7.12-17.92-7.11-7.08-18-7.08-10.88 0-17.88 7.08-7 7.09-7 17.92v63h-63q-10.83 0-17.92 7.12-7.08 7.11-7.08 18 0 10.88 7.08 17.88 7.09 7 17.92 7h63Zm240 53h152q10.4 0 17.2-7.12 6.8-7.11 6.8-18 0-10.88-6.5-17.38Q717-312 706-312H553q-10.4 0-17.2 6.5-6.8 6.5-6.8 17.38 0 10.89 7.08 18Q543.17-263 554-263Zm0-107h151q10.83 0 17.92-7.12 7.08-7.11 7.08-18 0-10.88-7.08-17.88-7.09-7-17.92-7H554q-10.83 0-17.92 7.12-7.08 7.11-7.08 18 0 10.88 7.08 17.88 7.09 7 17.92 7ZM266-605h146q10.83 0 17.92-7.12 7.08-7.11 7.08-18 0-10.88-7.08-17.88-7.09-7-17.92-7H266q-10.83 0-17.92 7.12-7.08 7.11-7.08 18 0 10.88 7.08 17.88 7.09 7 17.92 7Zm-86 485q-24 0-42-18t-18-42v-600q0-24 18-42t42-18h600q24 0 42 18t18 42v600q0 24-18 42t-42 18H180Zm0-60h600v-600H180v600Zm0-600v600-600Zm447 186 43 43q7.64 8 17.82 8t18.18-8q8-8 8-18t-8-18l-43-43 43-43q8-7.64 8-17.82T706-709q-8-8-18.18-8T670-709l-43 43-43-43q-7.64-8-17.82-8T548-709q-8 8-8 18.18t8 17.82l43 43-43 43q-8 7.71-8 18t8 18q7.64 8 17.82 8t18.18-8l43-43Z"/></svg>`
const USER_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M372-523q-42-42-42-108t42-108q42-42 108-42t108 42q42 42 42 108t-42 108q-42 42-108 42t-108-42ZM160-220v-34q0-38 19-65t49-41q67-30 128.5-45T480-420q62 0 123 15.5T731-360q31 14 50 41t19 65v34q0 25-17.5 42.5T740-160H220q-25 0-42.5-17.5T160-220Zm60 0h520v-34q0-16-9.5-30.5T707-306q-64-31-117-42.5T480-360q-57 0-111 11.5T252-306q-14 7-23 21.5t-9 30.5v34Zm324.5-346.5Q570-592 570-631t-25.5-64.5Q519-721 480-721t-64.5 25.5Q390-670 390-631t25.5 64.5Q441-541 480-541t64.5-25.5ZM480-631Zm0 411Z"/></svg>`
const CREDIT_CARD_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M880-740v520q0 24-18 42t-42 18H140q-24 0-42-18t-18-42v-520q0-24 18-42t42-18h680q24 0 42 18t18 42ZM140-631h680v-109H140v109Zm0 129v282h680v-282H140Zm0 282v-520 520Z"/></svg>`
const SETTINGS_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M421-80q-14 0-25-9t-13-23l-15-94q-19-7-40-19t-37-25l-86 40q-14 6-28 1.5T155-226L97-330q-8-13-4.5-27t15.5-23l80-59q-2-9-2.5-20.5T185-480q0-9 .5-20.5T188-521l-80-59q-12-9-15.5-23t4.5-27l58-104q8-13 22-17.5t28 1.5l86 40q16-13 37-25t40-18l15-95q2-14 13-23t25-9h118q14 0 25 9t13 23l15 94q19 7 40.5 18.5T669-710l86-40q14-6 27.5-1.5T804-734l59 104q8 13 4.5 27.5T852-580l-80 57q2 10 2.5 21.5t.5 21.5q0 10-.5 21t-2.5 21l80 58q12 8 15.5 22.5T863-330l-58 104q-8 13-22 17.5t-28-1.5l-86-40q-16 13-36.5 25.5T592-206l-15 94q-2 14-13 23t-25 9H421Zm15-60h88l14-112q33-8 62.5-25t53.5-41l106 46 40-72-94-69q4-17 6.5-33.5T715-480q0-17-2-33.5t-7-33.5l94-69-40-72-106 46q-23-26-52-43.5T538-708l-14-112h-88l-14 112q-34 7-63.5 24T306-642l-106-46-40 72 94 69q-4 17-6.5 33.5T245-480q0 17 2.5 33.5T254-413l-94 69 40 72 106-46q24 24 53.5 41t62.5 25l14 112Zm44-210q54 0 92-38t38-92q0-54-38-92t-92-38q-54 0-92 38t-38 92q0 54 38 92t92 38Zm0-130Z"/></svg>`

@Component({
  selector: "preview-command-groups",
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
    CommandSeparator,
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
              <div uiCommandGroup heading="Suggestions">
                <div uiCommandItem (select)="open.set(false)">
                  <span class="[&_svg]:size-4 [&_svg]:fill-current" [innerHTML]="calendar"></span>
                  <span>Calendar</span>
                </div>
                <div uiCommandItem (select)="open.set(false)">
                  <span class="[&_svg]:size-4 [&_svg]:fill-current" [innerHTML]="smile"></span>
                  <span>Search Emoji</span>
                </div>
                <div uiCommandItem (select)="open.set(false)">
                  <span class="[&_svg]:size-4 [&_svg]:fill-current" [innerHTML]="calculator"></span>
                  <span>Calculator</span>
                </div>
              </div>
              <div uiCommandSeparator></div>
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
export class CommandWithGroupsComponent {
  protected readonly open = signal(false)
  private readonly calendar = CALENDAR_SVG
  private readonly smile = SMILE_SVG
  private readonly calculator = CALCULATOR_SVG
  private readonly user = USER_SVG
  private readonly creditCard = CREDIT_CARD_SVG
  private readonly settings = SETTINGS_SVG
}

export default CommandWithGroupsComponent
