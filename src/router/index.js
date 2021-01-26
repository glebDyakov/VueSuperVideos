import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Film from '../views/Film.vue'

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
    
  }
  
]

const router = new VueRouter({
  routes
})

export default router
