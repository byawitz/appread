<template>
  <div class="ar-form">
    <h1>{{ Locale.locale('settings') }}</h1>
    <div class="ar-form-block">
      <label for="language">{{ Locale.locale('Language') }}</label>

      <select @change="Locale.saveLocale(language)" name="language" id="language" v-model="language">
        <option
            v-for="locale in Locale.availableLocales"
            :key="locale.name"
            :value="locale.name"
            v-text="locale.title"
        />
      </select>
    </div>

    <div class="ar-form-block">
      <label for="choose-theme">{{ Locale.locale('chooseTheme') }}</label>
      <select v-model="theme" name="choose-theme" id="choose-theme" @change="updateTheme">
        <option value="dark">{{ Locale.locale('darkDefault') }}</option>
        <option value="light">{{ Locale.locale('light') }}</option>
      </select>
    </div>
  </div>
</template>

<script setup lang="ts">
import Locale from "../locale/Locale";
import {onMounted, ref} from "vue";
import {useAppState} from "@/stores/State";


const appState = useAppState();
const theme    = ref('');
const language = ref(Locale.getCurrentLocale());

onMounted(() => {
  theme.value = appState.app.isLightTheme ? 'light' : 'dark';
});

function updateTheme() {
  appState.app.isLightTheme = theme.value === 'light';
}
</script>
