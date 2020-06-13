import {asyncRoutes, constantRouterMap } from '@/router'
import { getMenu } from '@/api/login'
import Layout from '@/views/layout/Layout'
import router from '@/router'
import routeMap from '@/assets/map/menu.js'

function filterAsyncRouter(routes,asyncRouterMap) {
   console.log(555555)
  console.log(routeMap)
    asyncRouterMap.forEach(route => {
      const menu ={}
      console.log(route)
      routeMap.forEach( item =>{
          console.log(item)
          if (route.component === 'Layout' &&  item.path == route.path) { // Layout组件特殊处理
            Object.assign(menu, item)
          }
        })
      routes.push(menu)
    })
  console.log(routes)
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRouterMap.concat(routes)
  }
}

const actions = {
  async generateRoutes({ commit }, roles) {
    // 取后台路由
    const asyncRouter = await getMenu()
    return new Promise(resolve => {
      const tmp = asyncRouter.data.permissionList
      console.log("获取资源")
      console.log(tmp)
      filterAsyncRouter(asyncRoutes,tmp)
      // console.log(asyncRoutes)
      commit('SET_ROUTES', asyncRoutes)
      /*commit('SET_NAME',asyncRouter.data.)*/
      console.log(asyncRoutes)
      //router.addRoutes(tmp)
      console.log("hell0")
      resolve(asyncRoutes)
    })
    }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
