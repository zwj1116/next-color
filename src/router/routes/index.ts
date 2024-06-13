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
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录',
      keepAlive: true,
    },
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/login/Register.vue'),
    meta: {
      title: '注册',
      keepAlive: true,
    },
  },
  {
    path: '/manage',
    name: 'manage',
    component: () => import('@/views/layout/ManageLayout.vue'),
    redirect: '/manage/article',
    meta: {
      title: '主页',
      keepAlive: true,
    },
    children: [
      {
        path: 'article',
        name: 'article',
        component: () => import('@/views/manage/article/index.vue'),
        meta: {
          title: '文章列表',
          parentPath: 'manage',
          menuPath: 'article',
          keepAlive: true,
        },
      },
      {
        path: 'opArticle',
        name: 'opArticle',
        component: () => import('@/views/manage/article/Op.vue'),
        meta: {
          title: '文章操作',
          parentPath: 'manage',
          menuPath: 'article',
          keepAlive: true,
        },
      },
      {
        path: 'detailarticle',
        name: 'detailarticle',
        component: () => import('@/views/manage/article/Detail.vue'),
        meta: {
          title: '文章详情',
          parentPath: 'manage',
          menuPath: 'article',
          keepAlive: true,
        },
      },
      {
        path: 'color',
        name: 'color',
        component: () => import('@/views/manage/color/index.vue'),
        meta: {
          title: '颜色列表',
          parentPath: 'manage',
          menuPath: 'color',
          keepAlive: true,
        },
      },
      {
        path: 'opColor',
        name: 'opColor',
        component: () => import('@/views/manage/color/Op.vue'),
        meta: {
          title: '文章操作',
          parentPath: 'manage',
          menuPath: 'color',
          keepAlive: true,
        },
      },
      {
        path: 'detailColor',
        name: 'detailColor',
        component: () => import('@/views/manage/color/Detail.vue'),
        meta: {
          title: '文章详情',
          parentPath: 'manage',
          menuPath: 'color',
          keepAlive: true,
        },
      },
    ],
  },
];
