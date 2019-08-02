import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './components/Home'
import SingleGradebook from './components/SingleGradebook'
import AllProfessors from './components/AllProfessors'
import SingleProfessor from './components/SingleProfessor'
import CreateGradebook from './components/CreateGradebook'
import CreateProfessor from './components/CreateProfessor'
import Login from './components/Login'
import Register from './components/Register'
import MyGradebook from './components/MyGradebook'
import CreateStudent from './components/CreateStudent'
import EditGradebook from './components/EditGradebook'
import EventBus from '../eventBus'

Vue.use(VueRouter)

Vue.prototype.$bus = EventBus

const routes = [
    { path: '/', component: Home },
    { path: '/gradebooks/create', component: CreateGradebook },
    { path: '/professors', component: AllProfessors,  },
    { path: '/professors/create', component: CreateProfessor },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/mygradebook', component: MyGradebook },
    { path: '/gradebooks/:id/edit', component: EditGradebook },
    { path: '/gradebooks/:id/students/create', component: CreateStudent },
    { path: '/gradebooks/:id', component: SingleGradebook},
    { path: '/professors/:id', component: SingleProfessor},
]

export const router = new VueRouter({
    routes: routes,
    mode: 'history'
})