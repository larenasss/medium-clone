import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/HomePage';
import Register from '@/views/RegisterPage';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
