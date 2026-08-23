// [FORCE-UI] Ember port of sidebar block sidebar-opt-in-form
// (React reference: apps/v4/registry/new-york-v4/blocks/sidebar-06/components/sidebar-opt-in-form.tsx)
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { SidebarInput } from '@/components/ui/sidebar';

import type { TOC } from '@ember/component/template-only';

const SidebarOptInForm: TOC<{ Element: HTMLDivElement; Blocks: { default: [] } }> =
  <template>
    <Card @class="gap-2 py-4 shadow-none" ...attributes>
      <CardHeader @class="px-4">
        <CardTitle @class="text-sm">Subscribe to our newsletter</CardTitle>
        <CardDescription>
          Opt-in to receive updates and news about the sidebar.
        </CardDescription>
      </CardHeader>
      <CardContent @class="px-4">
        <form>
          <div class="grid gap-2.5">
            <SidebarInput @type="email" placeholder="Email" />
            <Button
              class="bg-sidebar-primary text-sidebar-primary-foreground w-full shadow-none"
              @size="sm"
            >
              Subscribe
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  </template>;

export { SidebarOptInForm };
