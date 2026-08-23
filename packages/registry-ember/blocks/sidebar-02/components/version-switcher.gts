// [FORCE-UI] Ember port of sidebar block version-switcher
// (React reference: apps/v4/registry/new-york-v4/blocks/sidebar-01/components/version-switcher.tsx)
import Component from '@glimmer/component';
import { eq } from 'ember-truth-helpers';
import { tracked } from '@glimmer/tracking';
import { fn } from '@ember/helper';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

import Check from '~icons/ms/check';
import ChevronsUpDown from '~icons/ms/unfold_more';
import GalleryVerticalEnd from '~icons/ms/view_agenda';

interface VersionSwitcherSignature {
  Element: HTMLDivElement;
  Args: {
    versions: string[];
    defaultVersion: string;
  };
  Blocks: { default: [] };
}

class VersionSwitcherComponent extends Component<VersionSwitcherSignature> {
  @tracked selectedVersion: string;

  constructor(owner: unknown, args: VersionSwitcherSignature['Args']) {
    super(owner, args);
    this.selectedVersion = args.defaultVersion;
  }

  setSelectedVersion = (version: string) => {
    this.selectedVersion = version;
  };

  <template>
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger @asChild={{true}} as |trigger|>
            <SidebarMenuButton
              @size="lg"
              class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              {{trigger.modifiers}}
            >
              <div
                class="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg"
              >
                <GalleryVerticalEnd class="size-4" />
              </div>
              <div class="flex flex-col gap-0.5 leading-none">
                <span class="font-medium">Documentation</span>
                <span class="">v{{this.selectedVersion}}</span>
              </div>
              <ChevronsUpDown class="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent @align="start" class="w-(--radix-dropdown-menu-trigger-width)">
            {{#each @versions as |version|}}
              <DropdownMenuItem @onSelect={{fn this.setSelectedVersion version}}>
                v{{version}}
                {{#if (eq version this.selectedVersion)}}
                  <Check class="ml-auto" />
                {{/if}}
              </DropdownMenuItem>
            {{/each}}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  </template>
}

export { VersionSwitcherComponent as VersionSwitcher };
