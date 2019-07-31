import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './components/Home'
import SingleGradebook from './components/SingleGradebook'
import AllProfessors from './components/AllProfessors'

Vue.use(VueRouter)

const routes = [
    { path: '/', component: Home },
    { path: '/gradebooks/:id', component: SingleGradebook },
    { path: '/professors', component: AllProfessors },
]

export const router = new VueRouter({
    routes: routes,
    mode: 'history'
})