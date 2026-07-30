import { Component } from "@angular/core"
import { ButtonComponent } from "@/angular-ui/button"

@Component({
  selector: "preview-button-icon",
  standalone: true,
  imports: [ButtonComponent],
  template: `
    <button uiButton size="icon" variant="outline" aria-label="Settings">
      <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
        <path d="M370-80q-16 0-28-10t-15-26l-19-117q-26-9-51.5-23.5T210-289l-109 45q-15 6-30 1t-23-19L6-381q-8-14-5-30t16-26l95-74q-3-14-4.5-28.5T106-568q0-14 1.5-28.5T112-625L17-699q-13-10-16-26t5-30l52-109q8-14 23-19t30 1l109 45q23-20 48.5-34.5T320-895l19-117q3-16 15-26t28-10h104q16 0 28 10t15 26l19 117q26 9 51.5 23.5T650-847l109-45q15-6 30-1t23 19l52 109q8 14 5 30t-16 26l-95 74q3 14 4.5 28.5t1.5 28.5q0 14-1.5 28.5T758-551l95 74q13 10 16 26t-5 30L812-312q-8 14-23 19t-30-1l-109-45q-23 20-48.5 34.5T550-281l-19 117q-3 16-15 26t-28 10H370Zm52-80h115l19-113q37-8 66.5-26t55.5-47l107 44 55-96-92-71q4-19 5.5-37.5T755-568q0-19-1.5-37.5T748-643l92-71-55-96-107 44q-26-29-55.5-47T556-839l-19-113H422l-19 113q-37 8-66.5 26T281-766l-107-44-55 96 92 71q-4 19-5.5 37.5T204-568q0 19 1.5 37.5T211-493l-92 71 55 96 107-44q26 29 55.5 47t66.5 26l19 113Zm58-200q58 0 99-41t41-99q0-58-41-99t-99-41q-58 0-99 41t-41 99q0 58 41 99t99 41Zm0-140Z"/>
      </svg>
    </button>
  `,
})
export default class ButtonIconComponent {}
