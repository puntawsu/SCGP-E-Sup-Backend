// router/index.ts
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/main/banner/list',
    name: 'pages-main-banner-list',
    component: () => import('../src/pages/main/banner/list.vue'),
  },
  {
    path: '/main/user/list',
    name: 'pages-main-banner-list',
    component: () => import('../src/pages/main/user/list.vue'),
  },
  {
    path: '/main/document/list',
    name: 'pages-main-banner-list',
    component: () => import('../src/pages/main/document/list.vue'),
  },
  {
    path: '/main/managament/list',
    name: 'pages-main-banner-list',
    component: () => import('../src/pages/main/managament/list.vue'),
  },
  {
    path: '/main/supplier/list',
    name: 'pages-main-banner-list',
    component: () => import('../src/pages/main/supplier/list.vue'),
  },
  {
    path: '/main/news/list',
    name: 'pages-main-banner-list',
    component: () => import('../src/pages/main/news/list.vue'),
  },
  // เพิ่มเส้นทางอื่น ๆ ตามต้องการ
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
