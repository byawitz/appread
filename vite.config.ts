import {fileURLToPath, URL} from "node:url";

import {defineConfig} from "vite";
import vue from "@vitejs/plugin-vue";

const mobile = process.env.TAURI_PLATFORM === "android" || process.env.TAURI_PLATFORM === "ios";

export default defineConfig(async () => ({
    plugins: [vue()],

    clearScreen: false,
    server     : {
        port      : 1420,
        strictPort: true,
    },
    resolve    : {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    envPrefix  : ["VITE_", "TAURI_"],
    build      : {
        target   : process.env.TAURI_PLATFORM == "windows" ? "chrome105" : "safari13",
        minify   : !process.env.TAURI_DEBUG ? "esbuild" : false,
        sourcemap: !!process.env.TAURI_DEBUG,
    },
}));
