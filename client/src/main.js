import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';

import VueI18n from "vue-i18n";
import i18n from './i18n/i18n';

import loading from './plugins/loading';
Vue.use(loading);

import './assets/styles/main.scss';
import './plugins/axios'

Vue.use(VueI18n);

import TimezonePlugin from './plugins/timezone.js';
Vue.use(TimezonePlugin);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App)
}).$mount('#app')
