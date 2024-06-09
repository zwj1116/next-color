import { createApp } from 'vue';
import App from './App.vue';
import { default as router, setupRouter } from '@/router';
import { setupRouterGuard } from '@/router/guard';
import { setupStore } from '@/store';
import { loadAllPlugins } from '@/plugins';
import { loadAllDirective } from '@/directive';
import 'tailwindcss/tailwind.css';

(async () => {
  const app: ReturnType<typeof createApp> = createApp(App);

  setupStore(app);

  setupRouter(app);

  setupRouterGuard(router);

  loadAllPlugins(app);

  loadAllDirective(app);

  await Promise.all([router.isReady()]);

  app.mount('#app', true);
})();
