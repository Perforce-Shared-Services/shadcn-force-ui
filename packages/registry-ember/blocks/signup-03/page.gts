// [FORCE-UI] Ember port of registry:block signup-03 page (React reference: apps/v4/registry/new-york-v4/blocks/signup-03)
import { SignupForm } from './components/signup-form';

import GalleryVerticalEnd from '~icons/ms/view_agenda';

import type { TOC } from '@ember/component/template-only';

interface SignupPageSignature {
  Blocks: { default: [] };
}

const SignupPage: TOC<SignupPageSignature> = <template>
  <div
    class="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10"
  >
    <div class="flex w-full max-w-sm flex-col gap-6">
      <a href="#" class="flex items-center gap-2 self-center font-medium">
        <div
          class="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md"
        >
          <GalleryVerticalEnd class="size-4" />
        </div>
        Acme Inc.
      </a>
      <SignupForm />
    </div>
  </div>
</template>;

export default SignupPage;
