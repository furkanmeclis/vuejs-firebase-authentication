import { createRouter, createWebHistory } from 'vue-router'

import Home from '../pages/Home.vue'
import About from "../pages/About";
import Login from '../pages/Login'
import Profile from "../pages/Profile";
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,

  },
  {
    path: '/profile',
    name:"Profile",
    component: Profile
  },
  {
    path: '/about',
    name: 'About',
    component: About
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
