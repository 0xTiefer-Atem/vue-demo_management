import Vue from 'vue'
import VueRouter from 'vue-router'
const Login = () => import('../components/Login');
const Home = () => import('../components/Home');
import store from "../store/index";

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    component: Home
  }
];

const router = new VueRouter({
  routes,
  mode: 'history'
});

//挂载路由守卫
// router.beforeEach((to, from, next) => {
//   // console.log(to);
//   if(to.path === '/login'){
//     next();
//   }
//
//   let staff_id = to.params.staff_id;
//
//   console.log(staff_id);
//
//   if(staff_id === "" || staff_id === undefined){
//     next('/login')
//   }else{
//     next()
//   }
// });

export default router
