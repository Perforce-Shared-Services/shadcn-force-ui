// [FORCE-UI] Ember port of registry:block dashboard-01 site-header
// (React reference: apps/v4/registry/new-york-v4/blocks/dashboard-01/components/site-header.tsx)
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';

import type { TOC } from '@ember/component/template-only';

interface SiteHeaderSignature {
  Element: HTMLElement;
  Blocks: { default: [] };
}

const SiteHeader: TOC<SiteHeaderSignature> = <template>
  <header
    class="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)"
    ...attributes
  >
    <div class="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
      <SidebarTrigger @class="-ml-1" />
      <Separator
        @orientation="vertical"
        @class="mx-2 data-[orientation=vertical]:h-4"
      />
      <h1 class="cn-font-heading text-base font-medium">Documents</h1>
      <div class="ml-auto flex items-center gap-2">
        <Button @variant="ghost" @asChild={{true}} @size="sm" class="hidden sm:flex">
          <a
            href="https://github.com/shadcn-ui/ui/tree/main/apps/v4/app/(examples)/dashboard"
            rel="noopener noreferrer"
            target="_blank"
            class="dark:text-foreground"
          >
            GitHub
          </a>
        </Button>
      </div>
    </div>
  </header>
</template>;

export { SiteHeader };
