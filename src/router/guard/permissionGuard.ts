import { Router } from 'vue-router';
// import { isPro } from '@/utils/env';
// import { useBasicStore } from '@/store/modules/basic';
import { RequestCanceler } from '@/utils/http/axios/axiosCancel';

const axiosCanceler = new RequestCanceler();

export function createPermissionGuard(router: Router): void {
  router.beforeEach(async (to, from, next) => {
    axiosCanceler.removeAllPendingRequest();
    // if (!isPro) {
    //   useBasicStore().setToken(
    //     'eyJhbGciOiJIUzI1NiIsIjEwM2E3NzYxLTMxZmMtNDc0OS04NzIzLTY0MGU5MmI1YWQ5ZiI6Ijg2NTNlMzUyLTM1N2QtNGNlNy1iNjJhLWM2ZDc1ZTU2ODE3ZSIsInR5cCI6IkpXVCJ9.eyJ1c2VyX3R5cGUiOjEsImNvbXBhbnlfaWQiOiJ6ZGhrMTIzNDU2IiwidXNlcl9pZCI6IjVlYzc2MTY4YWE4MzhiMzMzODI4ZDY3YSIsImV4cCI6MTY2NzYzMzA2MywiaWF0IjoxNjY2NzY5MDYzLCJ1cGRhdGVfZGF0ZSI6MTY2NjY4ODI2NTIyMCwidXNlcm5hbWUiOiJ6ZGhrMTIzNDU2In0.ed0VYsXlb3fGzOweRgRQbhBP48nvk8p3rmy7hlNmuDU'
    //   );
    // }
    next();
  });
}
