import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Film from '../views/Film.vue'
import User from '../views/User.vue'
import RegisterNewUser from '../views/RegisterNewUser.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
    
  },
  {
    path: '/detailoffilmw',
    name: 'Film',
    component: Film
    
  },
  {
    path: '/user',
    name: 'User',
    component: User
    
  },  {
    path: '/register',
    name: 'RegisterNewUser',
    component: RegisterNewUser
    
  }
  
]

const router = new VueRouter({
  routes
})

export default router
