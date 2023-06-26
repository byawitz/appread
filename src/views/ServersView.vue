<template>
  <CoverUp :show="showForm" @close="showForm = false">
    <ServerForm :server="server"/>
  </CoverUp>

  <NoPagesTable
      :data="state.app.servers"
      :headings="Server.headings()"
      :data-fields="Server.dataFields()"

      :resource-name="Locale.locale('server')"
      :resource-name-plural="Locale.locale('servers')"

      @edit="editServer"
      @create="showForm = !showForm"
      @delete="deleteServer"
  />
</template>

<script setup lang="ts">
import NoPagesTable from "@/components/NoPagesTable.vue";
import Locale from "@/locale/Locale";
import {useAppState} from "@/stores/State";
import Server from "@/models/Server";
import CoverUp from "@/components/CoverUp.vue";
import {ref} from "vue";
import ServerForm from "@/sub-views/ServerForm.vue";

const showForm = ref(false);
const server   = ref(new Server('', ''));

const state = useAppState();

function editServer(title: string) {
  console.log(`Edit ${title}`);
}

function deleteServer(title: string) {
  state.app.servers.splice(state.app.servers.findIndex(server => server.title === title), 1);
}
</script>