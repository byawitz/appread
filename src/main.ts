import "@/locale/Locale";
import ToastPlugin from "vue-toast-notification";
import 'vue-toast-notification/dist/theme-sugar.css';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import {createApp} from 'vue'
import {createPinia} from 'pinia'


import App from './App.vue'
import router from './router'
import './assets/style/style.scss'

const app = createApp(App)

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate)

app.use(router)
app.use(ToastPlugin);
app.use(pinia);

app.mount('#app')
