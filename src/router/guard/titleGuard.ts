import { Router } from 'vue-router';

export function createTitleGuard(router: Router): void {
  router.afterEach(async () => {});
}
