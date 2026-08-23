// [FORCE-UI] Ember port of examples/base/combobox-input-group.tsx — trigger
// styled as an input group with an inline-start globe addon.
import { fn } from '@ember/helper';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { eq } from 'ember-truth-helpers';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/ember-ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/ember-ui/popover';
import { cn } from '@/ember-lib/utils';

import CheckIcon from '~icons/ms/check';
import GlobeIcon from '~icons/ms/public';

const timezones = [
  { value: 'Americas', items: ['(GMT-5) New York', '(GMT-8) Los Angeles'] },
  { value: 'Europe', items: ['(GMT+0) London', '(GMT+1) Paris'] },
  { value: 'Asia/Pacific', items: ['(GMT+9) Tokyo', '(GMT+8) Singapore'] },
];

export default class ComboboxInputGroup extends Component {
  @tracked open = false;
  @tracked value = '';

  handleSelect = (currentValue: string) => {
    this.value = currentValue === this.value ? '' : currentValue;
    this.open = false;
  };

  get selected() {
    return this.value || 'Select a timezone';
  }

  <template>
    <Popover @open={{this.open}} @onOpenChange={{fn (mut this.open)}}>
      <PopoverTrigger asChild={{true}}>
        <button
          aria-expanded={{this.open}}
          class="cn-input w-[280px] cursor-pointer text-left"
          data-slot="input-group-control"
          role="combobox"
        >
          <span class="flex w-full items-center gap-2">
            <GlobeIcon aria-hidden="true" class="size-4 text-muted-foreground" />
            {{#if this.value}}
              {{this.value}}
            {{else}}
              <span class="text-muted-foreground">{{this.selected}}</span>
            {{/if}}
          </span>
        </button>
      </PopoverTrigger>
      <PopoverContent @class="w-[280px] p-0">
        <Command>
          <CommandInput @placeholder="Select a timezone" />
          <CommandList>
            <CommandEmpty>No timezones found.</CommandEmpty>
            {{#each timezones as |group|}}
              <CommandGroup>
                <div
                  class="px-2 py-1.5 text-xs font-medium text-muted-foreground"
                >{{group.value}}</div>
                {{#each group.items as |item|}}
                  <CommandItem @onSelect={{this.handleSelect}} @value={{item}}>
                    {{item}}
                    <CheckIcon
                      class={{cn
                        "ml-auto size-4"
                        (if (eq this.value item) "opacity-100" "opacity-0")
                      }}
                    />
                  </CommandItem>
                {{/each}}
              </CommandGroup>
            {{/each}}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  </template>
}
