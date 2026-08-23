// [FORCE-UI] Ember port of registry:block login-04 page (React reference: apps/v4/registry/new-york-v4/blocks/login-04)
import { LoginForm } from './components/login-form';

import type { TOC } from '@ember/component/template-only';

interface LoginPageSignature {
  Blocks: { default: [] };
}

const LoginPage: TOC<LoginPageSignature> = <template>
  <div class="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
    <div class="w-full max-w-sm md:max-w-4xl">
      <LoginForm />
    </div>
  </div>
</template>;

export default LoginPage;
