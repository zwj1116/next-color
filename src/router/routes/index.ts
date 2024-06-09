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
    redirect: '/manage/artilce',
    meta: {
      title: '主页',
      keepAlive: true,
    },
    children: [
      {
        path: 'artilce',
        name: 'artilce',
        component: () => import('@/views/manage/artilce/index.vue'),
        meta: {
          title: '文章列表',
          parentPath: 'artilce',
          keepAlive: true,
        },
      },
      {
        path: 'opAartilce',
        name: 'opAartilce',
        component: () => import('@/views/manage/artilce/Op.vue'),
        meta: {
          title: '文章操作',
          parentPath: 'artilce',
          keepAlive: true,
        },
      },
      {
        path: 'detailArtilce',
        name: 'detailArtilce',
        component: () => import('@/views/manage/artilce/Detail.vue'),
        meta: {
          title: '文章详情',
          parentPath: 'artilce',
          keepAlive: true,
        },
      },
    ],
  },
];
