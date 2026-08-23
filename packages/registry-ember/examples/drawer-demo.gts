import { fn } from '@ember/helper';
import { on } from '@ember/modifier';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

import { Badge } from '@/ui/badge';
import { Button } from '@/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/ui/drawer';
import { Field, FieldContent, FieldDescription, FieldLabel, FieldTitle } from '@/ui/field';
import { RadioGroup, RadioGroupItem } from '@/ui/radio-group';

const deliveryTimes = [
  {
    value: 'asap',
    id: 'delivery-asap',
    label: 'Standard delivery',
    description: '25–35 min · Driver assigned now',
    badge: 'Fastest',
  },
  {
    value: '5-00',
    id: 'delivery-5-00',
    label: '5:00 PM – 5:15 PM',
    description: 'Prep starts at 4:45 PM',
  },
  {
    value: '5-30',
    id: 'delivery-5-30',
    label: '5:30 PM – 5:45 PM',
    description: "Good if you're heading home",
  },
  {
    value: '6-00',
    id: 'delivery-6-00',
    label: '6:00 PM – 6:15 PM',
    description: 'Most popular · High demand',
  },
];

export default class DrawerDemo extends Component {
  @tracked deliveryTime = 'asap';

  handleConfirm = () => {
    // demo is read-only; React version shows a toast here
  };

  <template>
    <Drawer>
      <DrawerTrigger @asChild={{true}}>
        <Button @variant="secondary">Open Drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Pick a delivery time</DrawerTitle>
          <DrawerDescription>
            We'll prepare your order as soon as possible.
          </DrawerDescription>
        </DrawerHeader>
        <div class="flex-1 scroll-fade overflow-y-auto p-4">
          <RadioGroup class="gap-2" @value={{this.deliveryTime}} @onValueChange={{(fn (mut this.deliveryTime))}}>
            {{#each deliveryTimes as |time|}}
              <FieldLabel @for={{time.id}}>
                <Field @orientation="horizontal">
                  <FieldContent>
                    <FieldTitle @class="flex items-center gap-2">
                      {{time.label}}
                      {{#if time.badge}}
                        <Badge @variant="secondary">{{time.badge}}</Badge>
                      {{/if}}
                    </FieldTitle>
                    <FieldDescription>{{time.description}}</FieldDescription>
                  </FieldContent>
                  <RadioGroupItem @value={{time.value}} id={{time.id}} />
                </Field>
              </FieldLabel>
            {{/each}}
          </RadioGroup>
        </div>
        <DrawerFooter>
          <Button {{on "click" this.handleConfirm}} class="h-[34px]">Confirm Delivery Time</Button>
          <DrawerClose @asChild={{true}}>
            <Button @variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  </template>
}
