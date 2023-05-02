import {createRouter, createWebHistory} from 'vue-router'
import Home from "@/views/HomeView.vue";
import Servers from "@/views/ServersView.vue";
import Server from "@/views/ServerView.vue";
import Projects from "@/views/ProjectsView.vue";
import Project from "@/views/ProjectView.vue";
import Readers from "@/views/ReadersView.vue";
import Reader from "@/views/ReaderView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes : [
        {path: '/', name: 'home', component: Home},
        {path: '/servers', name: 'home', component: Servers},
        {path: '/server/:id', name: 'home', component: Server},
        {path: '/projects', name: 'home', component: Projects},
        {path: '/projects/:id', name: 'home', component: Project},
        {path: '/readers/', name: 'home', component: Readers},
        {path: '/readers/:id', name: 'home', component: Reader},
    ]
})

export default router
