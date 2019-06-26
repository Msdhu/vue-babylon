import Vue from 'vue';
import VueRouter from 'vue-router';
import App from '../app/components/App.vue';

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [{
    path: '/',
    component: App,
  }],
});

export default router;
