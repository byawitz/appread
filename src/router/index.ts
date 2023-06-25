import {createRouter, createWebHistory} from 'vue-router'
import HomeView from "@/views/HomeView.vue";
import FlowsView from "@/views/FlowsView.vue";
import ActionsView from "@/views/ActionsView.vue";
import ServersView from "@/views/ServersView.vue";
import ProjectsView from "@/views/ProjectsView.vue";
import SingleRoute from "@/models/SingleRoute";
import Locale from "@/locale/Locale";
import SettingsView from "@/views/SettingsView.vue";

export const routes = [
    new SingleRoute('/', Locale.locale('home'), 'fa fa-flag', HomeView),
    new SingleRoute('/actions', Locale.locale('actions'), 'fa fa-bolt', ActionsView),
    new SingleRoute('/flows', Locale.locale('flows'), 'fa fa-stream', FlowsView),
    new SingleRoute('/projects', Locale.locale('projects'), 'fa fa-warehouse', ProjectsView),
    new SingleRoute('/servers', Locale.locale('servers'), 'fa fa-server', ServersView),
    new SingleRoute('/settings', Locale.locale('settings'), 'fa fa-gears', SettingsView),
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router
