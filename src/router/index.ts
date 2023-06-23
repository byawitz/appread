import {createRouter, createWebHistory} from 'vue-router'
import Home from "@/views/HomeView.vue";
import FlowsView from "@/views/FlowsView.vue";
import ActionsView from "@/views/ActionsView.vue";
import ServersView from "@/views/ServersView.vue";
import ProjectsView from "@/views/ProjectsView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes : [
        {path: '/', name: 'home', component: Home},
        {path: '/servers', name: 'Servers', component: ServersView},
        {path: '/projects', name: 'Projects', component: ProjectsView},
        {path: '/flows', name: 'Flows', component: FlowsView},
        {path: '/actions', name: 'Actions', component: ActionsView},
    ]
})

export default router
