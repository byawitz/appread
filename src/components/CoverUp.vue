<template>
  <div id="cover-up">
    <Transition name="cover">
      <div id="cover" v-if="show">
        <div id="cover-head">
          <h1>{{ title }}</h1>
        </div>

        <div id="cover-content">
          <slot></slot>
        </div>

        <div id="cover-bottom">
          <div @click="emits('close')" class="btn btn-text btn-red">{{ Locale.locale('close') }}</div>
        </div>
      </div>
    </Transition>

    <Transition name="up">
      <div id="up" v-if="show" @click="emits('close')"></div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import Locale from "../locale/Locale";
import {onMounted, onUnmounted} from "vue";

const emits = defineEmits(['close']);

defineProps({
  show : {type: Boolean, default: false},
  title: {type: String, default: 'Cover'}
});

onMounted(() => {
  window.addEventListener('keyup', closeOnEsc);
})


onUnmounted(() => {
  window.addEventListener('keyup', closeOnEsc);
})

function closeOnEsc(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    emits('close');
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/style/include/mixins";

.cover-leave-active,
.cover-enter-active, .up-leave-active,
.up-enter-active {

  transition: all 0.2s ease-out;
}


.cover-enter-from,
.cover-leave-to {
  transform: translateX(200px);
  opacity: 0;
}


.up-enter-from,
.up-leave-to {
  transform: translateX(-200px);
  opacity: 0;
}


div#cover {
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  width: 70%;
  background-color: var(--background-color);
  z-index: 1000;
  border-left: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  > div {
    padding: 2% 3%;
  }

  #cover-head {
    height: 6%;
    border-bottom: 1px solid var(--border-color);
    font-size: 20px;
    display: flex;
    align-items: center;
  }

  #cover-bottom {
    min-height: 60px;
  }


  #cover-content {
    height: 84%;
    overflow-y: scroll;

    @include scrollbars(5px, var(--border-color), var(--dark-background))
  }
}

div#up {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: 30%;
  background-color: #000000b5;
  z-index: 1000;
}

[dir="rtl"] {
  div#cover {
    right: unset;
    left: 0;
  }

  div#up {
    left: unset;
    right: 0;
  }

  .cover-enter-from,
  .cover-leave-to {
    transform: translateX(-200px);
    opacity: 0;
  }


  .up-enter-from,
  .up-leave-to {
    transform: translateX(200px);
    opacity: 0;
  }
}
</style>
