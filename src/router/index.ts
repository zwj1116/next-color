import {
  Router,
  createRouter,
  createWebHistory,
  createWebHashHistory,
  RouteRecordRaw,
} from 'vue-router';
import { allRoutes } from './routes';
import { isPro } from '@/utils/env';
import { App } from 'vue';
import { useBasicStore } from '@/store/modules/basic';

const router: Router = createRouter({
  history: isPro ? createWebHistory('/') : createWebHashHistory(),
  routes: allRoutes as unknown as RouteRecordRaw[],
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

export function setupRouter(app: App<Element>) {
  app.use(router);
}

router.beforeEach((to, from, next) => {
  Promise.all([useBasicStore().setDict()]).then(() => {
    next();
  });
});

export default router;
