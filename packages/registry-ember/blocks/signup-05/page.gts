// [FORCE-UI] Ember port of registry:block signup-05 page (React reference: apps/v4/registry/new-york-v4/blocks/signup-05)
import { SignupForm } from './components/signup-form';

import type { TOC } from '@ember/component/template-only';

interface SignupPageSignature {
  Blocks: { default: [] };
}

const SignupPage: TOC<SignupPageSignature> = <template>
  <div
    class="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10"
  >
    <div class="w-full max-w-sm">
      <SignupForm />
    </div>
  </div>
</template>;

export default SignupPage;
