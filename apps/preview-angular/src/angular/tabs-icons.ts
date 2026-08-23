import { Component } from "@angular/core"
import { Tabs, TabsList, TabsTrigger } from "@/angular-ui/tabs"

@Component({
  selector: "preview-tabs-icons",
  standalone: true,
  imports: [Tabs, TabsList, TabsTrigger],
  template: ` <div uiTabs defaultValue="preview">
    <div uiTabsList>
      <button uiTabsTrigger value="preview">
        <svg
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -960 960 960"
        >
          <path
            d="M146-160q-27 0-46.5-19.5T80-226v-428q0-27 19.5-46.5T146-720h134l50-54q9-11 22.5-16.5T381-796h198q14 0 28 5.5t23 16.5l50 54h134q27 0 46.5 19.5T880-654v428q0 27-19.5 46.5T814-160H146Zm0-60h668v-434H618l-63-72H406l-64 72H146v434Zm334-87q-45 0-76.5-31.5T372-415q0-45 31.5-76.5T480-523q45 0 76.5 31.5T588-415q0 45-31.5 76.5T480-307Z"
          />
        </svg>
        Preview
      </button>
      <button uiTabsTrigger value="code">
        <svg
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -960 960 960"
        >
          <path
            d="M320-240 80-480l240-240 57 57-184 184 184 184-57 55Zm320 0-57-57 184-184-184-183 57-56 240 240-240 240Z"
          />
        </svg>
        Code
      </button>
    </div>
  </div>`,
})
export class TabsIconsComponent {}

export default TabsIconsComponent
