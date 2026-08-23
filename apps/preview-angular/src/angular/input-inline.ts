import { Button } from "@/angular-ui/button"
import { Field } from "@/angular-ui/field"
import { Input } from "@/angular-ui/input"
import { Component } from "@angular/core"

@Component({
  selector: "preview-input-inline",
  standalone: true,
  imports: [Button, Field, Input],
  template: `
    <div uiField orientation="horizontal">
      <input uiInput type="search" placeholder="Search..." />
      <button uiButton>Search</button>
    </div>
  `,
})
export class InputInlineComponent {}

export default InputInlineComponent
