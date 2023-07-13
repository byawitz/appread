<template>
  <div id="home">

    <div id="welcome">
      <h1>Appread</h1>
      <h4><b>{{ Locale.locale('read') }}</b> {{ Locale.locale('whatYouveWritten')}} <a target="_blank" href="https://appwrite.io/">Appwrite</a></h4>
    </div>

    <div id="home-box">
      <div class="home-box"
           v-for="route in allowedForBox"
           :key="route.path"
      >
        <div class="hb-icon">
          <i :class="route.icon"></i>
        </div>
        <div class="hb-titles">
          <h3 v-text="route.name" @click="Helper.goTo(route.path,router)"/>
          <h4>{{ Locale.locale('total') }}: <span>{{ state.app[route.path.replace('/', '')].length }}</span></h4>
        </div>

      </div>


    </div>
  </div>
</template>

<script setup lang="ts">
import {computed,} from "vue";
import {routes} from "@/router";
import Locale from "../locale/Locale";
import {useAppState} from "@/stores/State";
import Helper from "@/utils/Helper";
import {useRouter} from "vue-router";

const state  = useAppState();
const router = useRouter();

const allowedRoutes = ['/actions', '/flows', '/projects', '/servers'];

const allowedForBox = computed(() => {
  return routes.filter((route) => allowedRoutes.includes(route.path));
});


</script>