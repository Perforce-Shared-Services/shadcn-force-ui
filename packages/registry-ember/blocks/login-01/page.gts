// [FORCE-UI] Ember port of registry:block login-01 page (React reference: apps/v4/registry/new-york-v4/blocks/login-01)
import { LoginForm } from './components/login-form';

import type { TOC } from '@ember/component/template-only';

interface LoginPageSignature {
  Blocks: { default: [] };
}

const LoginPage: TOC<LoginPageSignature> = <template>
  <div class="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
    <div class="w-full max-w-sm">
      <LoginForm />
    </div>
  </div>
</template>;

export default LoginPage;
