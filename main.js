import Vue from 'vue'
import App from './App'
import Vuex from 'vuex'
import store from './store'


import baseView from './components/base-view.vue'
Vue.component('base-view',baseView)

// 引入顶部弹窗组件
import topTips from './components/top-tips.vue'
Vue.component('top-tips',topTips)

Vue.config.productionTip = false

App.mpType = 'app'


Vue.use(Vuex)

const app = new Vue({
	store, 
    ...App
})
app.$mount()
