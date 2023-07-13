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
  text     : {scope: String, required: true},
  isLoading: {scope: Boolean, default: false},
});
</script>