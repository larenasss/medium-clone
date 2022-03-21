import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/HomePage';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      layout: 'main',
      auth: true
    }
  },
  {
    path: '/help',
    name: 'Help',
    component: () => import('../views/HelpPage.vue'),
    meta: {
      layout: 'main',
      auth: true
    }
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
