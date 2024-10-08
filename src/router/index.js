import { createRouter, createWebHashHistory } from 'vue-router'
import login from '../view/login.vue'
import signUp from '../view/signUp.vue'
import todolist from '../view/todolist.vue'

const router = createRouter({
  history: createWebHashHistory('/vuefinal/'),
  routes: [
    {
      path: '/',
      name: 'login',
      component: login,
    },
    {
      path: '/signUp',
      name: 'signUp',
      component: signUp,
    },
    {
      path: '/todolist',
      name: 'todolist',
      component: todolist,
    },
  ],
})

export default router
