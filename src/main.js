import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import './assets/main.scss'
import axios from 'axios'
import VueNotification from "@kugatsu/vuenotification";

Vue.config.productionTip = false

axios.defaults.baseURL = 'http://10.20.0.7:7676/api/v1/'

Vue.use(VueNotification);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
