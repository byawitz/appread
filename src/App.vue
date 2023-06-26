<script setup lang="ts">
import {onMounted, watch} from "vue";
import SideBar from "@/components/SideBar.vue";
import {useAppState} from "@/stores/State";

const state = useAppState();


onMounted(async () => {
  setTheme();
});

watch(state.app, setTheme)

function setTheme() {
  document.querySelector('body')!.classList.toggle('light', state.app.isLightTheme);
}

</script>

<template>
  <div id="wrapper">
    <SideBar/>
    <main>
      <RouterView/>
    </main>
  </div>
</template>

