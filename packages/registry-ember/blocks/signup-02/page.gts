// [FORCE-UI] Ember port of registry:block signup-02 page (React reference: apps/v4/registry/new-york-v4/blocks/signup-02)
import { SignupForm } from './components/signup-form';

import GalleryVerticalEnd from '~icons/ms/view_agenda';

import type { TOC } from '@ember/component/template-only';

interface SignupPageSignature {
  Blocks: { default: [] };
}

const SignupPage: TOC<SignupPageSignature> = <template>
  <div class="grid min-h-svh lg:grid-cols-2">
    <div class="flex flex-col gap-4 p-6 md:p-10">
      <div class="flex justify-center gap-2 md:justify-start">
        <a href="#" class="flex items-center gap-2 font-medium">
          <div
            class="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md"
          >
            <GalleryVerticalEnd class="size-4" />
          </div>
          Acme Inc.
        </a>
      </div>
      <div class="flex flex-1 items-center justify-center">
        <div class="w-full max-w-xs">
          <SignupForm />
        </div>
      </div>
    </div>
    <div class="relative hidden bg-muted lg:block">
      <img
        src="/placeholder.svg"
        alt="Image"
        class="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
      />
    </div>
  </div>
</template>;

export default SignupPage;
