import { createStore, createLogger } from 'vuex';
import auth from '@/store/modules/auth';
import feed from '@/store/modules/feed';

const plugins = [];

if (process.env.NODE_ENV === 'development') {
  plugins.push(createLogger());
}

export default createStore({
  plugins,
  state: {},
  mutations: {},
  actions: {},
  modules: { auth, feed }
});
