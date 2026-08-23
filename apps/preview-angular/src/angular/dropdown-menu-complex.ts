import { Component, signal } from "@angular/core"

import { Button } from "@/angular-ui/button"
import {
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuRoot,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/angular-ui/dropdown-menu"

// apps/v4/examples/base/dropdown-menu-complex.tsx
const svg = (d: string) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="${d}"/></svg>`

const FILE = svg("M349-250h262q12.75 0 21.38-8.68 8.62-8.67 8.62-21.5 0-12.82-8.62-21.32-8.63-8.5-21.38-8.5H349q-12.75 0-21.37 8.68-8.63 8.67-8.63 21.5 0 12.82 8.63 21.32 8.62 8.5 21.37 8.5Zm0-170h262q12.75 0 21.38-8.68 8.62-8.67 8.62-21.5 0-12.82-8.62-21.32-8.63-8.5-21.38-8.5H349q-12.75 0-21.37 8.68-8.63 8.67-8.63 21.5 0 12.82 8.63 21.32 8.62 8.5 21.37 8.5ZM220-80q-24 0-42-18t-18-42v-680q0-24 18-42t42-18h336q12.44 0 23.72 5T599-862l183 183q8 8 13 19.28 5 11.28 5 23.72v496q0 24-18 42t-42 18H220Z")
const FOLDER = svg("M140-160q-23 0-41.5-18.5T80-220v-520q0-23 18.5-41.5T140-800h256q12.44 0 23.72 5t19.37 13.09L481-740h339q23 0 41.5 18.5T880-680v460q0 23-18.5 41.5T820-160H140Zm0-60h680v-460H456l-60-60H140v520Zm0 0v-520 520Z")
const FOLDER_OPEN = svg("M140-160q-23 0-41.5-18.5T80-220v-520q0-23 18.5-41.5T140-800h256q12.44 0 23.72 5t19.37 13.09L481-740h369q12.75 0 21.38 8.68 8.62 8.67 8.62 21.5 0 12.82-8.62 21.32-8.63 8.5-21.38 8.5H455l-60-60H140v520l90-355q5-20 21.83-32.5Q268.65-620 289-620h574q29 0 47.5 23t10.5 52l-88 339q-6 24-22 35t-41 11H140Z")
const CODE = svg("m166-482 176 176q9 9 8.5 21t-9.5 21q-9 9-21.5 9t-21.5-9L101-461q-5-5-7-10t-2-11q0-6 2-11t7-10l200-200q9-9 21.5-9t21.5 9q9 9 9 21.5t-9 21.5L166-482Zm628 0L618-658q-9-9-8.5-21t9.5-21q9-9 21.5-9t21.5 9l197 197q5 5 7 10t2 11q0 6-2 11t-7 10L659-261q-9 9-21 8.5t-21-9.5q-9-9-9-21.5t9-21.5l177-177Z")
const MORE_HORIZ = svg("M207.86-432Q188-432 174-446.14t-14-34Q160-500 174.14-514t34-14Q228-528 242-513.86t14 34Q256-460 241.86-446t-34 14Zm272 0Q460-432 446-446.14t-14-34Q432-500 446.14-514t34-14Q500-528 514-513.86t14 34Q528-460 513.86-446t-34 14Zm272 0Q732-432 718-446.14t-14-34Q704-500 718.14-514t34-14Q772-528 786-513.86t14 34Q800-460 785.86-446t-34 14Z")
const SEARCH = svg("M378-329q-108.16 0-183.08-75Q120-479 120-585t75-181q75-75 181.5-75t181 75Q632-691 632-584.85 632-542 618-502q-14 40-42 75l242 240q9 8.56 9 21.78T818-143q-9 9-22.22 9-13.22 0-21.78-9L533-384q-30 26-69.96 40.5Q423.08-329 378-329Z")
const SAVE = svg("M180-120q-24 0-42-18t-18-42v-600q0-24 18-42t42-18h478q12.44 0 23.72 5T701-822l121 121q8 8 13 19.28 5 11.28 5 23.72v478q0 24-18 42t-42 18H180Zm600-536L656-780H180v600h600v-476ZM553.5-275.26q30.5-30.27 30.5-73.5 0-43.24-30.26-73.74-30.27-30.5-73.5-30.5-43.24 0-73.74 30.26-30.5 30.27-30.5 73.5 0 43.24 30.26 73.74 30.27 30.5 73.5 30.5 43.24 0 73.74-30.26ZM263-584h298q12.75 0 21.38-8.63Q591-601.25 591-614v-83q0-12.75-8.62-21.38Q573.75-727 561-727H263q-12.75 0-21.37 8.62Q233-709.75 233-697v83q0 12.75 8.63 21.37Q250.25-584 263-584Z")
const DOWNLOAD = svg("M469-327q-5-2-10-7L308-485q-9-9.27-8.5-21.64.5-12.36 9.11-21.36 9.39-9 21.89-9t21.5 9l98 99v-341q0-12.75 8.68-21.38 8.67-8.62 21.5-8.62 12.82 0 21.32 8.62 8.5 8.63 8.5 21.38v341l99-99q8.8-9 20.9-8.5 12.1.5 21.49 9.5 8.61 9 8.61 21.5t-9 21.5L501-334q-5 5-10.13 7-5.14 2-11 2-5.87 0-10.87-2ZM220-160q-24 0-42-18t-18-42v-113q0-12.75 8.68-21.38 8.67-8.62 21.5-8.62 12.82 0 21.32 8.62 8.5 8.63 8.5 21.38v113h520v-113q0-12.75 8.68-21.38 8.67-8.62 21.5-8.62 12.82 0 21.32 8.62 8.5 8.63 8.5 21.38v113q0 24-18 42t-42 18H220Z")
const EYE = svg("M600.5-379.62q49.5-49.62 49.5-120.5T600.38-620.5Q550.76-670 479.88-670T359.5-620.38Q310-570.76 310-499.88t49.62 120.38q49.62 49.5 120.5 49.5t120.38-49.62Zm-200-41.12q-32.5-32.73-32.5-79.5 0-46.76 32.74-79.26 32.73-32.5 79.5-32.5 46.76 0 79.26 32.74 32.5 32.73 32.5 79.5 0 46.76-32.74 79.26-32.73 32.5-79.5 32.5-46.76 0-79.26-32.74ZM234.5-276Q124-352 57-470q-4-7.13-6-14.65-2-7.52-2-15.43 0-7.92 2-15.38 2-7.47 6-14.54 67-118 177.5-194T480-800q135 0 245.5 76T903-530q4 7.12 6 14.65 2 7.52 2 15.43 0 7.92-2 15.38-2 7.47-6 14.54-67 118-177.5 194T480-200q-135 0-245.5-76ZM480-500Z")
const DASHBOARD = svg("M180-120q-24 0-42-18t-18-42v-600q0-24 18-42t42-18h600q24 0 42 18t18 42v600q0 24-18 42t-42 18H180Zm0-60h270v-600H180v600Zm330 0h270v-301H510v301Zm0-361h270v-239H510v239Z")
const PALETTE = svg("M480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-85 32-158t87.5-127q55.5-54 130-84.5T489-880q79 0 150 26.5T763.5-780q53.5 47 85 111.5T880-527q0 108-63 170.5T650-294h-75q-18 0-31 14t-13 31q0 27 14.5 46t14.5 44q0 38-21 58.5T480-80Zm0-400Zm-198 11q15-15 15-35t-15-35q-15-15-35-15t-35 15q-15 15-15 35t15 35q15 15 35 15t35-15Zm126-170q15-15 15-35t-15-35q-15-15-35-15t-35 15q-15 15-15 35t15 35q15 15 35 15t35-15Zm214 0q15-15 15-35t-15-35q-15-15-35-15t-35 15q-15 15-15 35t15 35q15 15 35 15t35-15Zm131 170q15-15 15-35t-15-35q-15-15-35-15t-35 15q-15 15-15 35t15 35q15 15 35 15t35-15ZM480-140q11 0 15.5-4.5T500-159q0-14-14.5-26T471-238q0-46 30-81t76-35h73q76 0 123-44.5T820-527q0-132-100-212.5T489-820q-146 0-247.5 98.5T140-480q0 141 99.5 240.5T480-140Z")
const LIGHT_MODE = svg("M579-380.76q41-40.77 41-99Q620-538 579.24-579q-40.77-41-99-41Q422-620 381-579.24q-41 40.77-41 99Q340-422 380.76-381q40.77 41 99 41Q538-340 579-380.76Z")
const DARK_MODE = svg("M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1.5T535-834q-45 32-70 84t-25 110q0 90 63 153t153 63q55 0 109-27t84-68q4 14 5.5 28.5T856-461q0 150-113 245.5T480-120Z")
const MONITOR = svg("M140-240q-24 0-42-18t-18-42v-480q0-24 18-42t42-18h680q24 0 42 18t18 42v480q0 24-18 42t-42 18H652l39 38q5 5 7 10.54 2 5.55 2 11.46v30q0 12.75-8.62 21.37Q682.75-120 670-120H290q-12.75 0-21.37-8.63Q260-137.25 260-150v-31q0-5.57 2-10.78 2-5.22 7-10.22l38-38H140Z")
const PERSON = svg("M372-523q-42-42-42-108t42-108q42-42 108-42t108 42q42 42 42 108t-42 108q-42 42-108 42t-108-42ZM160-220v-34q0-38 19-65t49-41q67-30 128.5-45T480-420q62 0 123 15.5T731-360q31 14 50 41t19 65v34q0 25-17.5 42.5T740-160H220q-25 0-42.5-17.5T160-220Z")
const CREDIT_CARD = svg("M880-740v520q0 24-18 42t-42 18H140q-24 0-42-18t-18-42v-520q0-24 18-42t42-18h680q24 0 42 18t18 42ZM140-631h680v-109H140v109Zm0 129v282h680v-282H140Zm0 282v-520 520Z")
const SETTINGS = svg("M421-80q-14 0-25-9t-13-23l-15-94q-19-7-40-19t-37-25l-86 40q-14 6-28 1.5T155-226L97-330q-8-13-4.5-27t15.5-23l80-59q-2-9-2.5-20.5T185-480q0-9 .5-20.5T188-521l-80-59q-12-9-15.5-23t4.5-27l58-104q8-13 22-17.5t28 1.5l86 40q16-13 37-25t40-18l15-95q2-14 13-23t25-9h118q14 0 25 9t13 23l15 94q19 7 40.5 18.5T669-710l86-40q14-6 27.5-1.5T804-734l59 104q8 13 4.5 27.5T852-580l-80 57q2 10 2.5 21.5t.5 21.5q0 10-.5 21t-2.5 21l80 58q12 8 15.5 22.5T863-330l-58 104q-8 13-22 17.5t-28-1.5l-86-40q-16 13-36.5 25.5T592-206l-15 94q-2 14-13 23t-25 9H421Z")
const KEYBOARD = svg("M140-200q-24 0-42-18.5T80-260v-440q0-24 18-42t42-18h680q24 0 42 18t18 42v440q0 23-18 41.5T820-200H140Zm0-60h680v-440H140v440Zm190-65h300q12.75 0 21.38-8.68 8.62-8.67 8.62-21.5 0-12.82-8.62-21.32-8.63-8.5-21.38-8.5H330q-12.75 0-21.37 8.68-8.63 8.67-8.63 21.5 0 12.82 8.63 21.32 8.62 8.5 21.37 8.5Z")
const LANGUAGE = svg("M323-111.5Q250-143 196-197t-85-127.5Q80-398 80-482t31-156.5Q142-711 196-765t127-84.5Q396-880 480-880t157 30.5Q710-819 764-765t85 126.5Q880-566 880-482t-31 157.5Q818-251 764-197t-127 85.5Q564-80 480-80t-157-31.5Z")
const BELL = svg("M190-200q-12.75 0-21.37-8.68-8.63-8.67-8.63-21.5 0-12.82 8.63-21.32 8.62-8.5 21.37-8.5h50v-304q0-84 49.5-150.5T420-798v-22q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v22q81 17 130.5 83.5T720-564v304h50q12.75 0 21.38 8.68 8.62 8.67 8.62 21.5 0 12.82-8.62 21.32-8.63 8.5-21.38 8.5H190Zm290-302Zm0 422q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM300-260h360v-304q0-75-52.5-127.5T480-744q-75 0-127.5 52.5T300-564v304Z")
const SHIELD = svg("M470.12-85q-4.56-1-9.12-3-139-47-220-168.5t-81-266.61V-719q0-19.26 10.88-34.66Q181.75-769.07 199-776l260-97q11-4 21-4t21 4l260 97q17.25 6.93 28.13 22.34Q800-738.26 800-719v195.89Q800-378 719-256.5T499-88q-4.56 2-9.12 3T480-84q-5.32 0-9.88-1Z")
const HELP = svg("M511-258.03q11-11.03 11-27T510.97-312q-11.03-11-27-11T457-311.97q-11 11.03-11 27T457.03-258q11.03 11 27 11T511-258.03ZM480.27-80q-82.74 0-155.5-31.5Q252-143 197.5-197.5t-86-127.34Q80-397.68 80-480.5t31.5-155.66Q143-709 197.5-763t127.34-85.5Q397.68-880 480.5-880t155.66 31.5Q709-817 763-763t85.5 127Q880-563 880-480.27q0 82.74-31.5 155.5Q817-252 763-197.68q-54 54.31-127 86Q563-80 480.27-80Z")
const FILE_TEXT = svg("M349-250h262q12.75 0 21.38-8.68 8.62-8.67 8.62-21.5 0-12.82-8.62-21.32-8.63-8.5-21.38-8.5H349q-12.75 0-21.37 8.68-8.63 8.67-8.63 21.5 0 12.82 8.63 21.32 8.62 8.5 21.37 8.5ZM220-80q-24 0-42-18t-18-42v-680q0-24 18-42t42-18h336q12.44 0 23.72 5T599-862l183 183q8 8 13 19.28 5 11.28 5 23.72v496q0 24-18 42t-42 18H220Z")
const LOGOUT = svg("M180-120q-24 0-42-18t-18-42v-600q0-24 18-42t42-18h269q12.75 0 21.38 8.68 8.62 8.67 8.62 21.5 0 12.82-8.62 21.32-8.63 8.5-21.38 8.5H180v600h269q12.75 0 21.38 8.68 8.62 8.67 8.62 21.5 0 12.82-8.62 21.32-8.63 8.5-21.38 8.5H180Zm545-330H390q-12.75 0-21.37-8.68-8.63-8.67-8.63-21.5 0-12.82 8.63-21.32 8.62-8.5 21.37-8.5h333l-81-81q-9-9-8.5-21t9.5-21q9-9 21.5-9t21.5 9l133 133q9 9 9 21t-9 21L687-326q-8.8 9-20.9 8.5-12.1-.5-21.49-9.5-8.61-9-8.61-21.5t9-21.5l80-80Z")

@Component({
  selector: "preview-dropdown-menu-complex",
  standalone: true,
  imports: [
    Button,
    DropdownMenuRoot,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuLabel,
    DropdownMenuItem,
    DropdownMenuShortcut,
    DropdownMenuCheckboxItem,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubTrigger,
    DropdownMenuSubContent,
  ],
  template: `<div uiDropdownMenuRoot>
    <button uiButton variant="outline" uiDropdownMenuTrigger>Complex Menu</button>
    <div uiDropdownMenuContent class="w-44">
      <div uiDropdownMenuGroup>
        <div uiDropdownMenuLabel>File</div>
        <button uiDropdownMenuItem>
          <svg aria-hidden="true" focusable="false" [innerHTML]="file"></svg>
          New File
          <span uiDropdownMenuShortcut>⌘N</span>
        </button>
        <button uiDropdownMenuItem>
          <svg aria-hidden="true" focusable="false" [innerHTML]="folder"></svg>
          New Folder
          <span uiDropdownMenuShortcut>⇧⌘N</span>
        </button>
        <div uiDropdownMenuSub>
          <button uiDropdownMenuSubTrigger>
            <svg aria-hidden="true" focusable="false" [innerHTML]="folderOpen"></svg>
            Open Recent
          </button>
          <div uiDropdownMenuSubContent class="w-44">
            <div uiDropdownMenuGroup>
              <div uiDropdownMenuLabel>Recent Projects</div>
              <button uiDropdownMenuItem>
                <svg aria-hidden="true" focusable="false" [innerHTML]="code"></svg>
                Project Alpha
              </button>
              <button uiDropdownMenuItem>
                <svg aria-hidden="true" focusable="false" [innerHTML]="code"></svg>
                Project Beta
              </button>
              <div uiDropdownMenuSub>
                <button uiDropdownMenuSubTrigger>
                  <svg aria-hidden="true" focusable="false" [innerHTML]="more"></svg>
                  More Projects
                </button>
                <div uiDropdownMenuSubContent class="w-44">
                  <button uiDropdownMenuItem>
                    <svg aria-hidden="true" focusable="false" [innerHTML]="code"></svg>
                    Project Gamma
                  </button>
                  <button uiDropdownMenuItem>
                    <svg aria-hidden="true" focusable="false" [innerHTML]="code"></svg>
                    Project Delta
                  </button>
                </div>
              </div>
            </div>
            <div uiDropdownMenuSeparator></div>
            <div uiDropdownMenuGroup>
              <button uiDropdownMenuItem>
                <svg aria-hidden="true" focusable="false" [innerHTML]="search"></svg>
                Browse...
              </button>
            </div>
          </div>
        </div>
        <div uiDropdownMenuSeparator></div>
        <button uiDropdownMenuItem>
          <svg aria-hidden="true" focusable="false" [innerHTML]="save"></svg>
          Save
          <span uiDropdownMenuShortcut>⌘S</span>
        </button>
        <button uiDropdownMenuItem>
          <svg aria-hidden="true" focusable="false" [innerHTML]="download"></svg>
          Export
          <span uiDropdownMenuShortcut>⇧⌘E</span>
        </button>
      </div>
      <div uiDropdownMenuSeparator></div>
      <div uiDropdownMenuGroup>
        <div uiDropdownMenuLabel>View</div>
        <button uiDropdownMenuCheckboxItem [(checked)]="showSidebar">
          <svg aria-hidden="true" focusable="false" [innerHTML]="eye"></svg>
          Show Sidebar
        </button>
        <button uiDropdownMenuCheckboxItem [(checked)]="showStatusBar">
          <svg aria-hidden="true" focusable="false" [innerHTML]="dashboard"></svg>
          Show Status Bar
        </button>
        <div uiDropdownMenuSub>
          <button uiDropdownMenuSubTrigger>
            <svg aria-hidden="true" focusable="false" [innerHTML]="palette"></svg>
            Theme
          </button>
          <div uiDropdownMenuSubContent class="w-40">
            <div uiDropdownMenuGroup>
              <div uiDropdownMenuLabel>Appearance</div>
              <div uiDropdownMenuRadioGroup [(value)]="theme">
                <button uiDropdownMenuRadioItem value="light">
                  <svg aria-hidden="true" focusable="false" [innerHTML]="lightMode"></svg>
                  Light
                </button>
                <button uiDropdownMenuRadioItem value="dark">
                  <svg aria-hidden="true" focusable="false" [innerHTML]="darkMode"></svg>
                  Dark
                </button>
                <button uiDropdownMenuRadioItem value="system">
                  <svg aria-hidden="true" focusable="false" [innerHTML]="monitor"></svg>
                  System
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div uiDropdownMenuSeparator></div>
      <div uiDropdownMenuGroup>
        <div uiDropdownMenuLabel>Account</div>
        <button uiDropdownMenuItem>
          <svg aria-hidden="true" focusable="false" [innerHTML]="person"></svg>
          Profile
          <span uiDropdownMenuShortcut>⇧⌘P</span>
        </button>
        <button uiDropdownMenuItem>
          <svg aria-hidden="true" focusable="false" [innerHTML]="card"></svg>
          Billing
        </button>
        <div uiDropdownMenuSub>
          <button uiDropdownMenuSubTrigger>
            <svg aria-hidden="true" focusable="false" [innerHTML]="settings"></svg>
            Settings
          </button>
          <div uiDropdownMenuSubContent class="w-52">
            <div uiDropdownMenuGroup>
              <div uiDropdownMenuLabel>Preferences</div>
              <button uiDropdownMenuItem>
                <svg aria-hidden="true" focusable="false" [innerHTML]="keyboard"></svg>
                Keyboard Shortcuts
              </button>
              <button uiDropdownMenuItem>
                <svg aria-hidden="true" focusable="false" [innerHTML]="language"></svg>
                Language
              </button>
              <div uiDropdownMenuSub>
                <button uiDropdownMenuSubTrigger>
                  <svg aria-hidden="true" focusable="false" [innerHTML]="bell"></svg>
                  Notifications
                </button>
                <div uiDropdownMenuSubContent class="w-52">
                  <div uiDropdownMenuGroup>
                    <div uiDropdownMenuLabel>Notification Types</div>
                    <button uiDropdownMenuCheckboxItem [(checked)]="pushNotifications">
                      <svg aria-hidden="true" focusable="false" [innerHTML]="bell"></svg>
                      Push Notifications
                    </button>
                    <button uiDropdownMenuCheckboxItem [(checked)]="emailNotifications">
                      <svg aria-hidden="true" focusable="false" [innerHTML]="mailIcon"></svg>
                      Email Notifications
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div uiDropdownMenuSeparator></div>
            <div uiDropdownMenuGroup>
              <button uiDropdownMenuItem>
                <svg aria-hidden="true" focusable="false" [innerHTML]="shield"></svg>
                Privacy &amp; Security
              </button>
            </div>
          </div>
        </div>
      </div>
      <div uiDropdownMenuSeparator></div>
      <div uiDropdownMenuGroup>
        <button uiDropdownMenuItem>
          <svg aria-hidden="true" focusable="false" [innerHTML]="help"></svg>
          Help &amp; Support
        </button>
        <button uiDropdownMenuItem>
          <svg aria-hidden="true" focusable="false" [innerHTML]="fileText"></svg>
          Documentation
        </button>
      </div>
      <div uiDropdownMenuSeparator></div>
      <div uiDropdownMenuGroup>
        <button uiDropdownMenuItem variant="destructive">
          <svg aria-hidden="true" focusable="false" [innerHTML]="logout"></svg>
          Sign Out
          <span uiDropdownMenuShortcut>⇧⌘Q</span>
        </button>
      </div>
    </div>
  </div>`,
})
export class DropdownMenuComplexComponent {
  protected readonly file = FILE
  protected readonly folder = FOLDER
  protected readonly folderOpen = FOLDER_OPEN
  protected readonly code = CODE
  protected readonly more = MORE_HORIZ
  protected readonly search = SEARCH
  protected readonly save = SAVE
  protected readonly download = DOWNLOAD
  protected readonly eye = EYE
  protected readonly dashboard = DASHBOARD
  protected readonly palette = PALETTE
  protected readonly lightMode = LIGHT_MODE
  protected readonly darkMode = DARK_MODE
  protected readonly monitor = MONITOR
  protected readonly person = PERSON
  protected readonly card = CREDIT_CARD
  protected readonly settings = SETTINGS
  protected readonly keyboard = KEYBOARD
  protected readonly language = LANGUAGE
  protected readonly bell = BELL
  protected readonly shield = SHIELD
  protected readonly help = HELP
  protected readonly fileText = FILE_TEXT
  protected readonly mailIcon = svg("M140-160q-24 0-42-18t-18-42v-520q0-24 18-42t42-18h680q24 0 42 18t18 42v520q0 24-18 42t-42 18H140Zm680-525L496-473q-4 2-7.5 3.5T480-468q-5 0-8.5-1.5T464-473L140-685v465h680v-465ZM480-522l336-218H145l335 218Z")
  protected readonly logout = LOGOUT

  // React demo reuses its notification state for the View checkboxes; kept
  // separate here under the names the example's labels describe.
  protected readonly showSidebar = signal(true)
  protected readonly showStatusBar = signal(false)
  protected readonly pushNotifications = signal(true)
  protected readonly emailNotifications = signal(true)
  protected readonly theme = signal("light")
}

export default DropdownMenuComplexComponent
