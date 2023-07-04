<template>
  <CoverUp :show="showForm" @close="showForm = false" :title="getTitle">
    <ServerForm :server="server" @close="showForm = false"/>
  </CoverUp>

  <NoPagesTable
      :data="state.app.servers"
      :headings="Server.headings()"
      :data-fields="Server.dataFields()"

      :resource-name="Locale.locale('server')"
      :resource-name-plural="Locale.locale('servers')"

      @edit="editServer"
      @create="createServer"
      @delete="deleteServer"
  />
</template>

<script setup lang="ts">
import NoPagesTable from "@/components/NoPagesTable.vue";
import Locale from "@/locale/Locale";
import {useAppState} from "@/stores/State";
import Server from "@/models/Server";
import CoverUp from "@/components/CoverUp.vue";
import {computed, ref} from "vue";
import ServerForm from "@/sub-views/ServerForm.vue";
import Alert from "@/utils/Alert";

const showForm = ref(false);
const server   = ref<Server>(new Server());

const state = useAppState();

function createServer() {
  server.value   = new Server();
  showForm.value = !showForm.value;

}

function editServer(title: string) {
  server.value   = state.app.servers.find(server => server.title === title) ?? new Server();
  showForm.value = true;
}

function deleteServer(title: string) {
  Alert.confirm(`${Locale.locale('Deleting')} ${title}?`, Locale.locale('This action cannot be undone'), Locale.locale('Delete'), () => {
    state.app.servers.splice(state.app.servers.findIndex(server => server.title === title), 1);
  });
}

const getTitle = computed(() => server.value.title !== '' ? Locale.locale('Update Server') : Locale.locale('Create Server'));
</script>