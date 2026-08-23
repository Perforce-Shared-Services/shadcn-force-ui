// [FORCE-UI] Ember port of registry:block signup-04 page (React reference: apps/v4/registry/new-york-v4/blocks/signup-04)
import { SignupForm } from './components/signup-form';

import type { TOC } from '@ember/component/template-only';

interface SignupPageSignature {
  Blocks: { default: [] };
}

const SignupPage: TOC<SignupPageSignature> = <template>
  <div class="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
    <div class="w-full max-w-sm md:max-w-4xl">
      <SignupForm />
    </div>
  </div>
</template>;

export default SignupPage;
