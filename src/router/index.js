import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/HomePage';
import Register from '@/views/RegisterPage';
import Login from '@/views/LoginPage';

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
