<template>
  <button @click.prevent="emits('click')" class="btn btn-text btn-green btn-large">
    <template v-if="!isLoading">
      {{ text }}
    </template>

    <template v-else>
      <i class="fa fa-refresh fa-spin"></i>
    </template>
  </button>

</template>
<script setup lang="ts">
const emits = defineEmits(['click']);

defineProps({
  text     : {type: String, required: true},
  isLoading: {type: Boolean, default: false},
});
</script>

<style scoped>

</style>