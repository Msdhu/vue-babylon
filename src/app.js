import Vue from 'vue';
import fastclick from 'fastclick';
import store from './store';
import router from './router';
import { eventBusPlugin } from './utils/eventBus';
import './app.scss';

fastclick.attach(document.body);
Vue.use(eventBusPlugin);

const app = new Vue({
  el: '#app',
  template: '<router-view></router-view>',
  store,
  router,
});
