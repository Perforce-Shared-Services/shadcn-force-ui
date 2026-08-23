// [FORCE-UI] Ember port of examples/base/combobox-groups.tsx (grouped
// timezones with separators via the composed command+popover pattern).
import { fn } from '@ember/helper';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { eq } from 'ember-truth-helpers';
import { Button } from '@/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/ui/popover';
import { cn } from '@/lib/utils';

import CheckIcon from '~icons/ms/check';
import ChevronsUpDownIcon from '~icons/ms/unfold_more';

const timezones = [
  {
    value: 'Americas',
    items: [
      '(GMT-5) New York',
      '(GMT-8) Los Angeles',
      '(GMT-6) Chicago',
      '(GMT-5) Toronto',
    ],
  },
  {
    value: 'Europe',
    items: ['(GMT+0) London', '(GMT+1) Paris', '(GMT+1) Berlin', '(GMT+1) Rome'],
  },
  {
    value: 'Asia/Pacific',
    items: [
      '(GMT+9) Tokyo',
      '(GMT+8) Shanghai',
      '(GMT+8) Singapore',
      '(GMT+11) Sydney',
    ],
  },
];

export default class ComboboxGroups extends Component {
  @tracked open = false;
  @tracked value = '';

  get groups() {
    return timezones.map((group, index) => ({
      ...group,
      showSeparator: index < timezones.length - 1,
    }));
  }

  handleSelect = (currentValue: string) => {
    this.value = currentValue === this.value ? '' : currentValue;
    this.open = false;
  };

  <template>
    <Popover @open={{this.open}} @onOpenChange={{fn (mut this.open)}}>
      <PopoverTrigger>
        {{! template-lint-disable require-mandatory-role-attributes }}
        <Button
          aria-expanded={{this.open}}
          role="combobox"
          @class="w-[250px] justify-between"
          @variant="outline"
        >
          {{if this.value this.value "Select a timezone"}}
          <ChevronsUpDownIcon class="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent @class="w-[250px] p-0">
        <Command>
          <CommandInput @placeholder="Select a timezone" />
          <CommandList>
            <CommandEmpty>No timezones found.</CommandEmpty>
            {{#each this.groups as |group|}}
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
              {{#if group.showSeparator}}
                <CommandSeparator />
              {{/if}}
            {{/each}}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  </template>
}
