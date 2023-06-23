<script setup lang="ts">
import {useRouter} from "vue-router";

const router = useRouter();

const menuItems = [
  {icon: 'fa fa-flag', title: 'Welcome', route: '/'},
  {icon: 'fa fa-play-circle', title: 'Actions', route: '/actions'},
  {icon: 'fa fa-stream', title: 'Flows', route: '/flows'},
  {icon: 'fa fa-warehouse', title: 'Projects', route: '/projects'},
  {icon: 'fa fa-server', title: 'Servers', route: '/servers'},
];


function goTo(where: string) {
  router.push(where);
}

function isCurrentPage(where: string): boolean {
  return router.currentRoute.value.path === where;
}
</script>

<template>
  <div id="sidebar">
    <div id="menu-items">
      <div class="menu-item"
           v-for="menu in menuItems"
           :key="menu.title"
           :class="{'selected':isCurrentPage(menu.route)}"
           @click="goTo(menu.route)">
        <div class="menu-item-icon">
          <i :class="menu.icon"/>
        </div>

        <div class="menu-item-title" v-text="menu.title"/>
      </div>
    </div>

    <div id="footer">
      Appread
    </div>
  </div>
</template>

<style scoped>

</style>