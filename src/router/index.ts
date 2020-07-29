import Vue from 'vue';
import VueRouter, { Route } from 'vue-router';
import store from '@/store';

Vue.use(VueRouter);

// Use webpackChunkName for route level code-splitting => lazy-loaded
const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: () => import(/* webpackChunkName: "dashboard" */ '../views/Dashboard.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "register" */ '../views/Register.vue'),
  },
  {
    path: '/logout',
    beforeEnter(to: any, from: any, next: any) {
      store.dispatch('auth/logout');
      next('/login');
    },
  },
  {
    path: '/test/:testParam',
    name: 'test',
    component: () => import(/* webpackChunkName: "test" */ '../views/Test.vue'),
  },
  {
    path: '/entry',
    name: 'entry',
    component: () => import(/* webpackChunkName: "entry" */ '../views/Entry.vue'),
  },
  {
    path: '/types/:type',
    name: 'types',
    props: true,
    component: () => import(/* webpackChunkName: "overview" */ '../views/Overview.vue'),
  },
  {
    path: '/profile',
    name: 'userprofile',
    component: () => import(/* webpackChunkName: "userprofile" */ '../views/UserProfile.vue'),
  },
  {
    path: '/settings',
    name: 'usersettings',
    component: () => import(/* webpackChunkName: "usersettings" */ '../views/UserSettings.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { x: 0, y: 0 };
  },
});

export default router;
