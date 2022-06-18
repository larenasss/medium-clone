import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
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

import auth from '@/middlewares/auth';
import { test } from '@/middlewares/auth';
import middlewarePipeline from '@/middlewares/middlewarePipeline';

const routes: Array<RouteRecordRaw> = [
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
        meta: {
          middlewares: [auth]
        },
        component: YourFeed,
      },
      {
        path: '/tags/:slug',
        name: 'tag',
        meta: {
          middlewares: [auth]
        },
        component: TagFeed,
      }
    ]
  },
  {
    path: '/articles/new',
    name: 'createArticle',
    meta: {
      middlewares: [auth]
    },
    component: CreateArticle
  },
  {
    path: '/articles/:slug',
    name: 'article',
    meta: {
      middlewares: [auth]
    },
    component: Article,
  },
  {
    path: '/articles/:slug/edit',
    name: 'editArticle',
    meta: {
      middlewares: [auth]
    },
    component: EditArticle,
  },
  {
    path: '/settings',
    name: 'settings',
    component: SettingsPage,
    meta: {
      middlewares: [auth, test]
    }
  },
  {
    path: '/profiles',
    name: 'userProfile',
    meta: {
      middlewares: [auth]
    },
    component: UserProfilePage,
    children: [
      {
        path: '/profiles/:userSlug',
        name: 'userProfileMyPosts',
        meta: {
          middlewares: [auth]
        },
        component: UserProfileMyPosts,
      },
      {
        path: '/profiles/:userSlug/favorites',
        name: 'userProfileFavorites',
        meta: {
          middlewares: [auth]
        },
        component: UserProfileFavorites,
      },
    ]
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

type Middlewares = Function[] | undefined;

router.beforeEach((to, from, next) => {
  const middlewares = to.meta.middlewares as Middlewares;
  if (!middlewares?.length) {
    return next();
  }

  const context = { to, from, next };
  const firstMiddlewareIndex = 0;
  const nextMiddlewareIndex = 1;
  return middlewares[firstMiddlewareIndex](
    context,
    middlewarePipeline(
      context,
      middlewares,
      nextMiddlewareIndex
    )
  );
});

export default router;
