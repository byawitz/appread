<template>
  <form>
    <div class="form-block">
      <label for="title">{{ Locale.locale('title') }}</label>
      <input type="text" name="title" id="title" v-model="title">
    </div>
    <div class="form-block">
      <label for="endpoint">{{ Locale.locale('endpoint') }}</label>
      <input type="text" name="endpoint" id="endpoint" v-model="endpoint">
    </div>
    <div class="form-block">
      <label for="version">{{ Locale.locale('version') }}</label>
      <input type="text" name="version" id="version" v-model="version">
    </div>
  </form>
</template>

<script setup lang="ts">
import type {PropType} from "vue";
import Server from "@/models/Server";
import Locale from "../locale/Locale";
import {ref} from "vue";

const props = defineProps({
  server: {type: Object as PropType<Server>, required: true}
});

const title    = ref(props.server!.title);
const endpoint = ref(props.server!.endpoint);
const version  = ref(props.server!.version);
</script>