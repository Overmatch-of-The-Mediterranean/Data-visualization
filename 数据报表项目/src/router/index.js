import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BMap2 from '../views/BMap.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/bmap2',
    name: 'BMap2',
    component: BMap2
  }
]

const router = new VueRouter({
  routes
})

export default router
