import {createApp} from 'vue'
import {createPinia} from 'pinia'

import 'vue-toast-notification/dist/theme-sugar.css';
import ToastPlugin from "vue-toast-notification";

import App from './App.vue'
import router from './router'

import './assets/style/style.scss'

const app = createApp(App)

app.use(router)
app.use(ToastPlugin);
app.use(createPinia())

app.mount('#app')
