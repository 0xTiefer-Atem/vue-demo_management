import Vue from 'vue'
import VueRouter from 'vue-router'
const Login = () => import('../components/Login');
const Home = () => import('../components/Home');
const Appointment = () => import('../components/appointment/Appointment');
const Queue = () => import('../components/queue/Queue');
const Case = () => import('../components/case/Case');
const Staff = () => import('../components/staff/Staff');

Vue.use(VueRouter);

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
};

const routes = [
  {
    path: '',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/home',
    component: Home,
    children: [
      {
        path: '',
        redirect: 'appointment'
      },
      {
        path: 'appointment',
        component: Appointment
      },
      {
        path: 'queue',
        component: Queue
      },
      {
        path: 'case',
        component: Case
      },
      {
        path: 'staff',
        component: Staff
      }
    ]
  }
];

const router = new VueRouter({
  routes,
  mode: 'history'
});


export default router
