// [FORCE-UI] Ember port of sidebar block settings-dialog
// (React reference: apps/v4/registry/new-york-v4/blocks/sidebar-13/components/settings-dialog.tsx)
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from '@/components/ui/sidebar';

import type { ComponentLike } from '@glint/template';
import type { TOC } from '@ember/component/template-only';

import Bell from '~icons/ms/notifications';
import MenuIcon from '~icons/ms/menu';
import Home from '~icons/ms/home';
import Paintbrush from '~icons/ms/brush';
import MessageCircle from '~icons/ms/chat_bubble';
import Globe from '~icons/ms/language';
import Keyboard from '~icons/ms/keyboard';
import Check from '~icons/ms/check';
import Video from '~icons/ms/videocam';
import LinkIcon from '~icons/ms/link';
import Lock from '~icons/ms/lock';
import Settings from '~icons/ms/settings';

const placeholderSections = Array.from({ length: 10 });

const nav: { name: string; icon: ComponentLike }[] = [
  { name: 'Notifications', icon: Bell },
  { name: 'Navigation', icon: MenuIcon },
  { name: 'Home', icon: Home },
  { name: 'Appearance', icon: Paintbrush },
  { name: 'Messages & media', icon: MessageCircle },
  { name: 'Language & region', icon: Globe },
  { name: 'Accessibility', icon: Keyboard },
  { name: 'Mark as read', icon: Check },
  { name: 'Audio & video', icon: Video },
  { name: 'Connected accounts', icon: LinkIcon },
  { name: 'Privacy & visibility', icon: Lock },
  { name: 'Advanced', icon: Settings },
];

interface SettingsDialogSignature {
  Blocks: { default: [] };
}

const SettingsDialog: TOC<SettingsDialogSignature> = <template>
  <Dialog>
    <DialogTrigger>
      <Button @size="sm">Open Dialog</Button>
    </DialogTrigger>
    <DialogContent @class="overflow-hidden p-0 md:max-h-[500px] md:max-w-[700px] lg:max-w-[800px]">
      <DialogTitle class="sr-only">Settings</DialogTitle>
      <DialogDescription class="sr-only">
        Customize your settings here.
      </DialogDescription>
      <SidebarProvider class="items-start">
        <Sidebar @collapsible="none" class="hidden md:flex">
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {{#each nav as |item|}}
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        @asChild={{true}}
                        @isActive={{eq item.name "Messages & media"}}
                      >
                        <a href="#">
                          <item.icon />
                          <span>{{item.name}}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  {{/each}}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <main class="flex h-[480px] flex-1 flex-col overflow-hidden">
          <header
            class="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12"
          >
            <div class="flex items-center gap-2 px-4">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem class="hidden md:block">
                    <BreadcrumbLink @href="#">Settings</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator class="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Messages & media</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          <div class="flex flex-1 flex-col gap-4 overflow-y-auto p-4 pt-0">
            {{#each placeholderSections as |_| }}
              <div class="aspect-video max-w-3xl rounded-xl bg-muted/50"></div>
            {{/each}}
          </div>
        </main>
      </SidebarProvider>
    </DialogContent>
  </Dialog>
</template>;

export { SettingsDialog };
