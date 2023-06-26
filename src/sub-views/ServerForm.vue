<template>
  <form @submit="saveServer">
    <div class="form-block">
      <label for="title">{{ Locale.locale('title') }}</label>
      <input type="text" name="title" id="title" v-model="title" required="required">
    </div>

    <div class="form-block">
      <label for="endpoint">{{ Locale.locale('endpoint') }}</label>
      <input type="text" name="endpoint" id="endpoint" v-model="endpoint" required="required">
    </div>

    <div class="form-block">
      <label for="version">{{ Locale.locale('version') }}</label>
      <input type="text" name="version" id="version" v-model="version" disabled="disabled">
    </div>

    <LoadingButton :is-loading="isSavingServer" :text="Locale.locale('submit')" @click="saveServer"/>
  </form>
</template>

<script setup lang="ts">
import type {PropType} from "vue";
import Server from "@/models/Server";
import Locale from "../locale/Locale";
import {onMounted, ref} from "vue";
import LoadingButton from "@/components/LoadingButton.vue";
import {useAppState} from "@/stores/State";
import Helper from "@/utils/Helper";
import ToastPlugin, {useToast} from "vue-toast-notification";

const emits = defineEmits(['close']);

const props = defineProps({
  server: {type: Object as PropType<Server>, required: true}
});

const state  = useAppState();
const $toast = useToast();

const title    = ref(props.server!.title);
const endpoint = ref(props.server!.endpoint);
const version  = ref(props.server!.version);

const isSavingServer = ref(false);
const isEdit         = ref(false);

onMounted(() => {
  if (props.server!.title !== '') {
    isEdit.value = true;
  }
  $toast.error(Locale.locale('Server with this name already exists'), {duration: 1000000});

})

function addServer(server: Server) {
  if (state.app.servers.find(s => s.title === server.title) !== undefined) {
    isSavingServer.value = false;
    return;
  }

  emits('close');
}

function updateServer(server: Server) {

}

async function saveServer() {
  isSavingServer.value = true;

  const server = new Server(title.value, Helper.getAppwriteEndpoint(endpoint.value));

  if (await server.checkAppwrite()) {
    if (isEdit.value) {
      updateServer(server);
    } else {
      addServer(server);
    }
  }
}
</script>