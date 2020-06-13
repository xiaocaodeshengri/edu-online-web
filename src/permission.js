import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import {constantRouterMap } from './router'
NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login', '/auth-redirect'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // determine whether the user has logged in
  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      const routes = store.getters.routes && store.getters.routes.length > 0
      console.log(store.getters.routes)
      console.log("获取role"+store.getters.routes.length)
      console.log("获取菜单")
      console.log(constantRouterMap)
      if (routes) {
         next()
       }else{
        try {
          const accessRoutes =await store.dispatch('permission/generateRoutes')
          console.log("zhuanhui")
          console.log(accessRoutes)
          router.options.routes = accessRoutes;
          console.log( router.options.routes)
          router.addRoutes(accessRoutes)
          console.log("shoudoing")
          //router.selfaddRoutes(accessRoutes)
          console.log(constantRouterMap)
          console.log("zhuanhui222")
          //next({ ...to, replace: true })
          // next({ ...to, replace: true })
          next()
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('FedLogOut')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
       }
      }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
