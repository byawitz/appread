<script setup lang="ts">
import {onMounted} from "vue";

onMounted(async () => {
    console.log('Here we go');
})
</script>

<template>
	Welcome
	<RouterView/>
</template>

