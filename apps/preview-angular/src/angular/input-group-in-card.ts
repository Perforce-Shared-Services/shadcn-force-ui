import { Component } from "@angular/core"

import { Button } from "@/angular-ui/button"
import { Label } from "@/angular-ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/angular-ui/card"
import { Input } from "@/angular-ui/input"
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText, InputGroupTextarea } from "@/angular-ui/input-group"

// Field wrappers from the React example are inlined (Field not yet ported).
@Component({
  selector: "preview-input-group-in-card",
  standalone: true,
  imports: [Button, Label, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Input, InputGroup, InputGroupAddon, InputGroupInput, InputGroupText, InputGroupTextarea],
  template: `
    <div uiCard class="w-full">
      <div uiCardHeader>
        <h3 uiCardTitle>Card with Input Group</h3>
        <p uiCardDescription>This is a card with an input group.</p>
      </div>
      <div uiCardContent>
        <div data-slot="field-group" class="flex w-full flex-col gap-5">
          <div data-slot="field" role="group" class="flex w-full flex-col gap-2">
            <label uiLabel for="email-input">Email Address</label>
            <div uiInputGroup>
              <input uiInputGroupInput id="email-input" type="email" placeholder="you@example.com" />
              <div uiInputGroupAddon align="inline-end">
                <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                  <path d="M140-160q-24 0-42-18t-18-42v-520q0-24 18-42t42-18h680q24 0 42 18t18 42v520q0 24-18 42t-42 18H140Zm680-525L496-473q-4 2-7.5 3.5T480-468q-5 0-8.5-1.5T464-473L140-685v465h680v-465ZM480-522l336-218H145l335 218ZM140-685v7-39.32.73V-740v23-.91V-678v-7 465-465Z" />
                </svg>
              </div>
            </div>
          </div>
          <div data-slot="field" role="group" class="flex w-full flex-col gap-2">
            <label uiLabel for="website-input">Website URL</label>
            <div uiInputGroup>
              <div uiInputGroupAddon>
                <span uiInputGroupText>https://</span>
              </div>
              <input uiInputGroupInput id="website-input" placeholder="example.com" />
              <div uiInputGroupAddon align="inline-end">
                <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                  <path d="M180-120q-24 0-42-18t-18-42v-600q0-24 18-42t42-18h249q12.75 0 21.38 8.68 8.62 8.67 8.62 21.5 0 12.82-8.62 21.32-8.63 8.5-21.38 8.5H180v600h600v-249q0-12.75 8.68-21.38 8.67-8.62 21.5-8.62 12.82 0 21.32 8.62 8.5 8.63 8.5 21.38v249q0 24-18 42t-42 18H180Zm600-617L403-360q-9 9-21 8.5t-21-9.5q-9-9-9-21t9-21l377-377H549q-12.75 0-21.37-8.68-8.63-8.67-8.63-21.5 0-12.82 8.63-21.32 8.62-8.5 21.37-8.5h261q12.75 0 21.38 8.62Q840-822.75 840-810v261q0 12.75-8.68 21.37-8.67 8.63-21.5 8.63-12.82 0-21.32-8.63-8.5-8.62-8.5-21.37v-188Z" />
                </svg>
              </div>
            </div>
          </div>
          <div data-slot="field" role="group" class="flex w-full flex-col gap-2">
            <label uiLabel for="feedback-textarea">Feedback &amp; Comments</label>
            <div uiInputGroup>
              <textarea uiInputGroupTextarea id="feedback-textarea" placeholder="Share your thoughts..." class="min-h-[100px]"></textarea>
              <div uiInputGroupAddon align="block-end">
                <span uiInputGroupText>0/500 characters</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div uiCardFooter class="justify-end gap-2">
        <button uiButton variant="outline">Cancel</button>
        <button uiButton>Submit</button>
      </div>
    </div>
  `,
})
export class InputGroupInCardComponent {}

export default InputGroupInCardComponent
