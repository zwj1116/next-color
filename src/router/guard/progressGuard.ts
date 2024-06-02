import nProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { Router } from 'vue-router';

export function createProgressGuard(router: Router): void {
  router.beforeEach(() => {
    nProgress.start();
    return true;
  });

  router.afterEach(() => {
    nProgress.done();
    return true;
  });
}
