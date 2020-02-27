import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import App from './App.vue'
import router from './router'
import store from './store'

import './assets/css/css.css'
import './assets/css/style.css'

import $$ from '@/libs/$$.js'

import { 
  Button,
  Uploader,
  NavBar,
  Tab,
  Tabs,
  Notify,
  List,
  Cell,
  CellGroup,
  DatetimePicker,
  Popup,
  Icon,
  Tabbar,
  TabbarItem,
  Dialog,
  SwipeCell,
  NoticeBar,
  PullRefresh,
  Search,
  Switch,
  Picker 
} from 'vant'

Vue.use(Button)
Vue.use(Uploader)
Vue.use(NavBar)
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(Notify)
Vue.use(List)
Vue.use(Cell)
Vue.use(CellGroup)
Vue.use(DatetimePicker)
Vue.use(Popup)
Vue.use(Icon)
Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(Dialog)
Vue.use(SwipeCell)
Vue.use(NoticeBar)
Vue.use(PullRefresh)
Vue.use(Search)
Vue.use(Switch)
Vue.use(Picker)

Vue.use(Vuex)
Vue.config.productionTip = false

Vue.prototype.$http = axios
Vue.prototype.$$ = $$
Vue.prototype.toUrl = function(url, params) {
  this.$router.push({path: url, query: params})
}

import headerNav from '@c/header/index'
import footerNav from '@c/footer/index'
import unlock from '@c/unlock/index'

Vue.component('headerNav', headerNav)
Vue.component('footerNav', footerNav)
Vue.component('unlock', unlock)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
