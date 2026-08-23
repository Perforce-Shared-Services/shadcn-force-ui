import { Button } from "@/angular-ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/angular-ui/field"
import { Input } from "@/angular-ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/angular-ui/select"
import { Component } from "@angular/core"

@Component({
  selector: "preview-input-form",
  standalone: true,
  imports: [
    Button,
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    Input,
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectGroup,
    SelectItem,
  ],
  template: `
    <form class="w-full max-w-sm">
      <div uiFieldGroup>
        <div uiField>
          <label uiFieldLabel for="form-name">Name</label>
          <input
            uiInput
            id="form-name"
            type="text"
            placeholder="Evil Rabbit"
            required
          />
        </div>
        <div uiField>
          <label uiFieldLabel for="form-email">Email</label>
          <input
            uiInput
            id="form-email"
            type="email"
            placeholder="john@example.com"
          />
          <p uiFieldDescription>
            We'll never share your email with anyone.
          </p>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div uiField>
            <label uiFieldLabel for="form-phone">Phone</label>
            <input
              uiInput
              id="form-phone"
              type="tel"
              placeholder="+1 (555) 123-4567"
            />
          </div>
          <div uiField>
            <label uiFieldLabel for="form-country">Country</label>
            <div uiSelect>
              <button uiSelectTrigger id="form-country" class="w-full">
                <span uiSelectValue placeholder="United States"></span>
              </button>
              <ng-template uiSelectPortal>
                <div uiSelectPositioner>
                  <div uiSelectContent>
                    <div uiSelectGroup>
                      <div uiSelectItem value="us">United States</div>
                      <div uiSelectItem value="uk">United Kingdom</div>
                      <div uiSelectItem value="ca">Canada</div>
                    </div>
                  </div>
                </div>
              </ng-template>
            </div>
          </div>
        </div>
        <div uiField>
          <label uiFieldLabel for="form-address">Address</label>
          <input uiInput id="form-address" type="text" placeholder="123 Main St" />
        </div>
        <div uiField orientation="horizontal">
          <button uiButton type="button" variant="outline">Cancel</button>
          <button uiButton type="submit">Submit</button>
        </div>
      </div>
    </form>
  `,
})
export class InputFormComponent {}

export default InputFormComponent
