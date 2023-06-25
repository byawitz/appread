<script setup lang="ts">
import {useRouter} from "vue-router";
import Helper from "@/utils/Helper";
import {routes} from "@/router";

const router = useRouter();

function isCurrentPage(where: string): boolean {
  return router.currentRoute.value.path === where;
}
</script>

<template>
  <div id="sidebar">
    <div id="menu-items">
      <div class="menu-item"
           v-for="menu in routes"
           :key="menu.name"
           :class="{'selected':isCurrentPage(menu.path)}"
           @click="Helper.goTo(menu.path, router)">
        <div class="menu-item-icon">
          <i :class="menu.icon"/>
        </div>

        <div class="menu-item-title" v-text="menu.name"/>
      </div>
    </div>

    <div id="sidebar-footer">
      Appread
    </div>
  </div>
</template>

<style scoped>

</style>