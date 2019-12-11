import Vue from 'vue'
import Router from 'vue-router'
import routes from './routers'

// import cookies from '@/libs/cookie.js'
import store from '@/store/index.js'
// console.log(cookies)
// console.log(store.state)
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(error=> error)
}


Vue.use(Router)

// console.log(routes)

const routers = new Router({
  routes
})

routers.beforeEach((to, from, next) => {
  const token = store.state.address
  // console.log(token)
  // console.log(to)
  if (token) {
    next()
  } else {
    if (to.path === '/enter' || to.path === '/register' || to.path === '/login') {
      next()
    } else {
      next('/enter')
    }
  }
})


export default routers