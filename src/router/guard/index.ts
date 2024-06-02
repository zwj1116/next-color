import { createTitleGuard } from './titleGuard';
import { createProgressGuard } from './progressGuard';
import { createPermissionGuard } from './permissionGuard';
import { Router } from 'vue-router';

export function setupRouterGuard(router: Router): void {
  createTitleGuard(router);
  createProgressGuard(router);
  createPermissionGuard(router);
}
