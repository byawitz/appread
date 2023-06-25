import {defineStore} from 'pinia';
import AppState from "@/stores/AppState";

const APP_KEY = 'appState';

export const useAppState = defineStore(APP_KEY, {
    state  : () => {
        return {app: new AppState()};
    },
    persist: true,
});
