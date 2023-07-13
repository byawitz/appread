<template>
  <form @submit="saveServer">
    <div class="form-block">
      <label for="title">{{ Locale.locale('title') }}</label>
      <input type="text" name="title" id="title" v-model="title" required="required"  autocomplete="disabled">
    </div>

    <div class="form-block">
      <label for="endpoint">{{ Locale.locale('endpoint') }}</label>
      <input type="text" name="endpoint" id="endpoint" v-model="endpoint" required="required" autocomplete="disabled">
    </div>

    <LoadingButton :is-loading="isSavingServer" :text="Locale.locale('submit')" @click="saveServer"/>
  </form>
</template>

<script setup lang="ts">
import type {PropType} from "vue";
import {onMounted, ref} from "vue";
import Server from "@/models/Server";
import Locale from "../locale/Locale";
import LoadingButton from "@/components/LoadingButton.vue";
import {useAppState} from "@/stores/State";
import Helper from "@/utils/Helper";
import {useToast} from "vue-toast-notification";

const emits = defineEmits(['close']);

const props = defineProps({
  server: {scope: Object as PropType<Server>, required: true}
});

const state  = useAppState();
const $toast = useToast();

const title    = ref(props.server!.title);
const endpoint = ref(props.server!.endpoint);

const isSavingServer = ref(false);
const isEdit         = ref(false);

onMounted(() => {
  if (props.server!.title !== '') {
    isEdit.value = true;
  }
})

function addServer(server: Server) {
  if (state.app.servers.find(s => s.title === server.title) !== undefined) {
    $toast.error(Locale.locale('Server with this name already exists'));

    return;
  }

  insertSerer(server);
}

function updateServer(server: Server) {
  state.app.servers.splice(state.app.servers.findIndex(s => s.title === props.server!.title), 1);

  state.app.projects.forEach((project) => {
    if (project.server.title === props.server!.title) {
      project.server = server;
    }
  })

  insertSerer(server);
}

function insertSerer(server: Server) {
  state.app.servers.push(server);
  emits('close');

}

async function saveServer() {
  if (endpoint.value === '' || title.value === '') {
    $toast.error(Locale.locale('All fields must be filled'));

    return;
  }

  isSavingServer.value = true;

  const server = new Server(title.value, Helper.getAppwriteEndpoint(endpoint.value));

  if (await server.checkAppwrite()) {
    if (isEdit.value) {
      updateServer(server);
    } else {
      addServer(server);
    }
  } else {
    $toast.error(Locale.locale('Cannot connect to server. Double check the entered details.'));
  }

  isSavingServer.value = false;
}
</script>
