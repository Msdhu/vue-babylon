import Vue from 'vue';
import Vuex from 'vuex';
import common from './common';
import app from '@/src/app/store';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  modules: {
    common: { namespaced: true, ...common },
    app: { namespaced: true, modules: { ...app } },
  },
});
