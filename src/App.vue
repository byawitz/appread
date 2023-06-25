<script setup lang="ts">
import {onMounted, watch} from "vue";
import SideBar from "@/components/SideBar.vue";
import {useAppState} from "@/stores/State";

const state = useAppState();

function setTheme() {
  document.querySelector('body')!.classList.toggle('light', state.app.isLightTheme);
}

watch(state.app, setTheme)

onMounted(async () => {
  setTheme();
});


</script>

<template>
  <div id="wrapper">
    <SideBar/>
    <main>
      <RouterView/>
    </main>
  </div>
</template>

