import Vue from 'vue'
import VueRouter from 'vue-router'
const Home = () => import ('../views/Home.vue')
const About = () => import('../views/About.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/about',
    component: About
  }
]

const router = new VueRouter({
  routes
})

export default router
