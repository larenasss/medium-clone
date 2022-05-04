import { createRouter, createWebHistory } from 'vue-router';
import FeedPage from '@/views/feed/FeedPage.vue';
import GlobalFeed from '@/views/feed/GlobalFeed.vue';
import YourFeed from '@/views/feed/YourFeed.vue';
import TagFeed from '@/views/feed/TagFeed.vue';
import Register from '@/views/RegisterPage.vue';
import Login from '@/views/LoginPage.vue';
import Article from '@/views/article/ArticleItem.vue';
import CreateArticle from '@/views/article/CreateArticle.vue';
import EditArticle from '@/views/article/EditArticle.vue';
import SettingsPage from '@/views/SettingsPage.vue';
import UserProfilePage from '@/views/userProfile/UserProfilePage.vue';
import UserProfileMyPosts from '@/views/userProfile/UserProfileMyPosts.vue';
import UserProfileFavorites from '@/views/userProfile/UserProfileFavorites.vue';

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
