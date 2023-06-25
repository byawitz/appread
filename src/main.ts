import {createApp} from 'vue'
import {createPinia} from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import 'vue-toast-notification/dist/theme-sugar.css';
import ToastPlugin from "vue-toast-notification";
import "@/locale/Locale";

import App from './App.vue'
import router from './router'

import './assets/style/style.scss'


const app = createApp(App)

app.use(router)
app.use(ToastPlugin);

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate)

app.use(pinia);

app.mount('#app')
