<template>
  <div>{{ currentEndpoint }}</div>
</template>

<script setup lang="ts">
//.requestBody.content['application/json'].schema.properties
import {onMounted} from "vue";

const props = defineProps<{ currentEndpoint: any }>();


onMounted(() => {
  if (!props.currentEndpoint) return;
  // console.log(props.currentEndpoint.requestBody.content['application/json'].schema.properties);

})
</script>
