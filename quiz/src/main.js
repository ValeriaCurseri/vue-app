import Vue from 'vue'

// importo il js di Bootstrap Vue
import { BootstrapVue } from 'bootstrap-vue'
// import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
// importo il css di Bootstrap Vue
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import App from './App.vue'

// Install BootstrapVue
Vue.use(BootstrapVue)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
