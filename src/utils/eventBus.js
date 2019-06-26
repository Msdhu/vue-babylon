import Vue from 'vue';

export const eventBus = new Vue();

export const eventBusPlugin = {
  install(Vue, options) {
    Vue.prototype.$eventBus = {
      emit(name, data) {
        eventBus.$emit(name, data);
      },

      on(name, callback) {
        eventBus.$on(name, callback);
      },

      off(name, callback) {
        eventBus.$off(name, callback);
      },
    };
  },
};

export default eventBus;
