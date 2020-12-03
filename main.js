import Vue from 'vue'
import App from './App'
import Vuex from 'vuex'
import store from './store'

Vue.config.productionTip = false

App.mpType = 'app'

Vue.use(Vuex)

const app = new Vue({
	store, 
    ...App
})
app.$mount()
