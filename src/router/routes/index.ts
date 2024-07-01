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
    name: 'blog',
    component: () => import('@/views/layout/BlogLayout.vue'),
    redirect: '/vColor',
    meta: {
      title: '主页',
      keepAlive: true,
    },
    children: [
      {
        path: 'vArticle',
        name: 'vArticle',
        component: () => import('@/views/blog/article/index.vue'),
        meta: {
          title: '概览',
          keepAlive: true,
        },
      },
      {
        path: 'vArticleDetail',
        name: 'vArticleDetail',
        component: () => import('@/views/blog/article/Detail.vue'),
        meta: {
          title: '概览',
          keepAlive: true,
        },
      },
      {
        path: 'vColor',
        name: 'vColor',
        component: () => import('@/views/blog/color/index.vue'),
        meta: {
          title: '概览',
          keepAlive: true,
        },
      },
    ],
  },
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
          needBack: false,
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
          needBack: true,
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
          needBack: true,
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
          title: '颜色操作',
          parentPath: 'manage',
          menuPath: 'color',
          needBack: true,
          keepAlive: true,
        },
      },
      {
        path: 'detailColor',
        name: 'detailColor',
        component: () => import('@/views/manage/color/Detail.vue'),
        meta: {
          title: '颜色详情',
          parentPath: 'manage',
          menuPath: 'color',
          needBack: true,
          keepAlive: true,
        },
      },
      {
        path: 'dict',
        name: 'dict',
        component: () => import('@/views/manage/dict/index.vue'),
        meta: {
          title: '字典管理',
          parentPath: 'manage',
          menuPath: 'dict',
          needBack: false,
          keepAlive: true,
        },
      },
      {
        path: 'love',
        name: 'love',
        component: () => import('@/views/manage/love/index.vue'),
        meta: {
          title: '喜爱列表',
          parentPath: 'manage',
          menuPath: 'love',
          keepAlive: true,
        },
      },
      {
        path: 'opLove',
        name: 'opLove',
        component: () => import('@/views/manage/love/Op.vue'),
        meta: {
          title: '喜爱操作',
          parentPath: 'manage',
          menuPath: 'love',
          needBack: true,
          keepAlive: true,
        },
      },
      {
        path: 'detailLove',
        name: 'detailLove',
        component: () => import('@/views/manage/love/Detail.vue'),
        meta: {
          title: '喜爱详情',
          parentPath: 'manage',
          menuPath: 'love',
          needBack: true,
          keepAlive: true,
        },
      },
    ],
  },
];
