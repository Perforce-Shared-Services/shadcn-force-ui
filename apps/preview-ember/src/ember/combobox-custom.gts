// [FORCE-UI] Ember port of examples/base/combobox-custom.tsx — custom item
// rendering with country flag emoji and continent description.
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
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from '@/ember-ui/item';
import { Popover, PopoverContent, PopoverTrigger } from '@/ember-ui/popover';
import { cn } from '@/ember-lib/utils';

import CheckIcon from '~icons/ms/check';
import ChevronsUpDownIcon from '~icons/ms/unfold_more';

const countries = [
  { code: '', label: 'Select country' },
  { code: '🇦🇷', value: 'argentina', label: 'Argentina', continent: 'South America' },
  { code: '🇦🇺', value: 'australia', label: 'Australia', continent: 'Oceania' },
  { code: '🇧🇷', value: 'brazil', label: 'Brazil', continent: 'South America' },
  { code: '🇨🇦', value: 'canada', label: 'Canada', continent: 'North America' },
  { code: '🇨🇳', value: 'china', label: 'China', continent: 'Asia' },
  { code: '🇫🇷', value: 'france', label: 'France', continent: 'Europe' },
  { code: '🇩🇪', value: 'germany', label: 'Germany', continent: 'Europe' },
  { code: '🇯🇵', value: 'japan', label: 'Japan', continent: 'Asia' },
  { code: '🇰🇪', value: 'kenya', label: 'Kenya', continent: 'Africa' },
  { code: '🇬🇧', value: 'united-kingdom', label: 'United Kingdom', continent: 'Europe' },
  { code: '🇺🇸', value: 'united-states', label: 'United States', continent: 'North America' },
];

export default class ComboboxCustom extends Component {
  @tracked open = false;
  @tracked value = '';

  get selectedCountry() {
    return countries.find(
      (c) => 'value' in c && c.value === this.value
    );
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
      <PopoverContent @class="w-[280px] p-0">
        <Command>
          <CommandInput @placeholder="Select country" />
          <CommandList>
            <CommandEmpty>No country found.</CommandEmpty>
            <CommandGroup>
              {{#each countries as |country|}}
                {{#if country.value}}
                  <CommandItem
                    @onSelect={{this.handleSelect}}
                    @value={{country.value}}
                    class="gap-2 px-2"
                  >
                    <span>{{country.code}}</span>
                    <Item class="min-w-0 flex-1 px-0">
                      <ItemContent>
                        <ItemTitle>{{country.label}}</ItemTitle>
                        <ItemDescription>{{country.continent}}</ItemDescription>
                      </ItemContent>
                    </Item>
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
                {{/if}}
              {{/each}}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  </template>
}
