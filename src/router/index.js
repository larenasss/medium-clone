import { createRouter, createWebHistory } from 'vue-router';
import GlobalFeed from '@/views/GlobalFeed';
import Register from '@/views/RegisterPage';
import Login from '@/views/LoginPage';

const routes = [
  {
    path: '/',
    name: 'globalFeed',
    component: GlobalFeed,
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
