import { RouteRecordRaw } from 'vue-router';

/** 自动加载其他路由模块 */
const files = require.context('.', true, /\.ts$/);
const modules: Array<RouteRecordRaw> = [];
files.keys().forEach((key) => {
  if (key === './index.ts') return;
  modules.push(files(key).default);
});

export const allRoutes = [
  {
    path: '/',
    redirect: '/manage',
  },
  // {
  //   path: '/index',
  //   name: 'index',
  //   component: () => import('@/views/home/index.vue'),
  //   redirect: '/index/overview',
  //   meta: {
  //     title: '主页',
  //     keepAlive: true,
  //   },
  //   children: [
  //     {
  //       path: 'overview',
  //       name: 'overview',
  //       components: () => import('@/views/overview/left/index.vue'),
  //       meta: {
  //         title: '概览',
  //         keepAlive: true,
  //       },
  //     },
  //   ],
  // },
  {
    path: '/manage',
    name: 'manage',
    component: () => import('@/views/layout/ManageLayout.vue'),
    redirect: '/manage/user',
    meta: {
      title: '主页',
      keepAlive: true,
    },
    children: [
      {
        path: 'user',
        name: 'user',
        component: () => import('@/views/manage/user/index.vue'),
        meta: {
          title: '用户管理',
          keepAlive: true,
        },
      },
    ],
  },
];
