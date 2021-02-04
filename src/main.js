import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './styles/index.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import EventBus from '@/EventBus/index.js'

Vue.prototype.$EventBus = EventBus
// key名开头带$的,要么是全局的,要么是Vue内置的

Vue.config.productionTip = false

Vue.use(ElementUI)

const a = '10'
console.log(a)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
