import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './components/Home'
import SingleGradebook from './components/SingleGradebook'
import AllProfessors from './components/AllProfessors'
import SingleProfessor from './components/SingleProfessor'
import CreateGradebook from './components/CreateGradebook'

Vue.use(VueRouter)

const routes = [
    { path: '/', component: Home },
    { path: '/gradebooks/create', component: CreateGradebook },
    { path: '/professors', component: AllProfessors },
    { path: '/gradebooks/:id', component: SingleGradebook },
    { path: '/professors/:id', component: SingleProfessor },
]

export const router = new VueRouter({
    routes: routes,
    mode: 'history'
})