import { createRouter, createWebHistory } from 'vue-router';
import FeedPage from '@/views/feed/FeedPage';
import GlobalFeed from '@/views/feed/GlobalFeed';
import YourFeed from '@/views/feed/YourFeed';
import TagFeed from '@/views/feed/TagFeed';
import Register from '@/views/RegisterPage';
import Login from '@/views/LoginPage';
import Article from '@/views/article/ArticleItem';
import CreateArticle from '@/views/article/CreateArticle';
import EditArticle from '@/views/article/EditArticle';
import SettingsPage from '@/views/SettingsPage';
import UserProfilePage from '@/views/userProfile/UserProfilePage';
import UserProfileMyPosts from '@/views/userProfile/UserProfileMyPosts';
import UserProfileFavorites from '@/views/userProfile/UserProfileFavorites';

const routes = [
  {
    path: '/register',
    name: 'register',
    component: Register,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/',
    name: 'mainFeed',
    component: FeedPage,
    children: [
      {
        path: '/',
        name: 'globalFeed',
        component: GlobalFeed,
      },
      {
        path: '/yourFeed',
        name: 'yourFeed',
        component: YourFeed,
      },
      {
        path: '/tags/:slug',
        name: 'tag',
        component: TagFeed,
      }
    ]
  },
  {
    path: '/articles/new',
    name: 'createArticle',
    component: CreateArticle,
  },
  {
    path: '/articles/:slug',
    name: 'article',
    component: Article,
  },
  {
    path: '/articles/:slug/edit',
    name: 'editArticle',
    component: EditArticle,
  },
  {
    path: '/settings',
    name: 'settings',
    component: SettingsPage,
  },
  {
    path: '/profiles',
    name: 'userProfile',
    component: UserProfilePage,
    children: [
      {
        path: '/profiles/:slug',
        name: 'userProfileMyPosts',
        component: UserProfileMyPosts,
      },
      {
        path: '/profiles/:slug/favorites',
        name: 'userProfileFavorites',
        component: UserProfileFavorites,
      },
    ]
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
