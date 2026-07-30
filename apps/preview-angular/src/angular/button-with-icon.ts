import { Component } from "@angular/core"
import { ButtonComponent } from "@/angular-ui/button"

@Component({
  selector: "preview-button-with-icon",
  standalone: true,
  imports: [ButtonComponent],
  template: `
    <button uiButton>
      <svg data-icon="inline-start" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
        <path d="M197.69-140q-23.61 0-40.65-17.04T140-197.69v-564.62q0-23.61 17.04-40.65T197.69-820h451.85q11.61 0 22.73 4.81 11.11 4.81 18.73 12.42L802.77-691q7.61 7.62 12.42 18.73 4.81 11.12 4.81 22.73v451.85q0 23.61-17.04 40.65T762.31-140H197.69Z"/>
      </svg>
      Save version
    </button>
  `,
})
export default class ButtonWithIconComponent {}
