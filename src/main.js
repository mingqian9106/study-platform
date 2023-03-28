import Vue from 'vue'
import App from './App.vue'
import { Lazyload, List, Search, Image as VanImage, Rate, Divider, Cell } from 'vant'

Vue.config.productionTip = false

Vue.use(Lazyload)
Vue.use(List)
Vue.use(Search)
Vue.use(VanImage)
Vue.use(Rate)
Vue.use(Divider)
Vue.use(Cell)

new Vue({
  render: h => h(App),
}).$mount('#app')
