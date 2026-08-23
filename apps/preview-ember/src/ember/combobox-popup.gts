// [FORCE-UI] Ember port of examples/base/combobox-popup.tsx. The base-ui
// ComboboxTrigger/ComboboxValue pair maps to the composed popover trigger.
import { fn } from '@ember/helper';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { eq } from 'ember-truth-helpers';
import { Button } from '@/ember-ui/button';
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
import ChevronsUpDownIcon from '~icons/ms/unfold_more';

const countries = [
  { code: '🇦🇷', value: 'argentina', label: 'Argentina' },
  { code: '🇦🇺', value: 'australia', label: 'Australia' },
  { code: '🇧🇷', value: 'brazil', label: 'Brazil' },
  { code: '🇨🇦', value: 'canada', label: 'Canada' },
  { code: '🇨🇳', value: 'china', label: 'China' },
  { code: '🇫🇷', value: 'france', label: 'France' },
  { code: '🇩🇪', value: 'germany', label: 'Germany' },
  { code: '🇯🇵', value: 'japan', label: 'Japan' },
  { code: '🇰🇪', value: 'kenya', label: 'Kenya' },
  { code: '🇺🇸', value: 'united-states', label: 'United States' },
];

export default class ComboboxPopup extends Component {
  @tracked open = false;
  @tracked value = '';

  get selectedCountry() {
    return countries.find((c) => c.value === this.value);
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
          {{#if this.selectedCountry}}
            {{this.selectedCountry.code}}
            {{this.selectedCountry.label}}
          {{else}}
            Select country
          {{/if}}
          <ChevronsUpDownIcon class="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent @class="w-[250px] p-0">
        <Command>
          <CommandInput @placeholder="Select country" />
          <CommandList>
            <CommandEmpty>No country found.</CommandEmpty>
            <CommandGroup>
              {{#each countries as |country|}}
                <CommandItem
                  @onSelect={{this.handleSelect}}
                  @value={{country.value}}
                  class="gap-2"
                >
                  <span>{{country.code}}</span>
                  {{country.label}}
                  <CheckIcon
                    class={{cn
                      "ml-auto size-4"
                      (if
                        (eq this.value country.value)
                        "opacity-100"
                        "opacity-0"
                      )
                    }}
                  />
                </CommandItem>
              {{/each}}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  </template>
}
