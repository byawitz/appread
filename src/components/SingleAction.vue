<template>
  <div class="action"
       :class="scope"
       @click="emits('click')">
    <div class="action-details">
      <div class="action-icon"><i class="fa fa-bolt"></i></div>
      <div class="action-type">{{ type }}</div>
      <div class="action-title">{{ name }}</div>
      <div class="action-project">{{ projectName }}</div>
    </div>

    <div class="action-project-version">
      <span class="code">{{ version }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {PropType} from "vue";
import type {ActionScope} from "@/models/Action";

defineProps({
  scope      : {type: String as PropType<ActionScope>, default: 'client'},
  type       : {type: String, required: true},
  name       : {type: String, required: true},
  projectName: {type: String, required: true},
  version    : {type: String, required: true}
});

const emits = defineEmits(['click']);
</script>