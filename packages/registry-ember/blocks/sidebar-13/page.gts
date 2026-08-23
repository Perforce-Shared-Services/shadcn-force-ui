// [FORCE-UI] Ember port of registry:block sidebar-13 page
// (React reference: apps/v4/registry/new-york-v4/blocks/sidebar-13/page.tsx)
import { SettingsDialog } from './components/settings-dialog.gts';

import type { TOC } from '@ember/component/template-only';

interface PageSignature {
  Blocks: { default: [] };
}

const Page: TOC<PageSignature> = <template>
  <div class="flex h-svh items-center justify-center">
    <SettingsDialog />
  </div>
</template>;

export default Page;
