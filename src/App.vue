<script setup lang="ts">
import {onMounted} from "vue";
import SideBar from "@/components/SideBar.vue";

onMounted(async () => {
  console.log('Here we go');
})
</script>

<template>
  <div id="wrapper">
    <SideBar/>
    <main>
      <RouterView/>
    </main>
  </div>
</template>

