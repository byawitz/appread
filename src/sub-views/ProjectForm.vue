<template>
  <form @submit="saveProject">
    <div class="form-block">
      <label for="server">{{ Locale.locale('server') }}</label>

      <div class="select-holder">
        <select name="server" id="server" v-model="server">
          <option value="-1">{{ Locale.locale('select server') }}</option>

          <option
              v-for="server in state.app.servers"
              :key="server.title"
              :value="server.title">{{ server.title }}
          </option>
        </select>
      </div>
    </div>

    <div class="form-block">
      <label for="title">{{ Locale.locale('title') }}</label>
      <input type="text" name="title" id="title" v-model="title" required="required">
    </div>

    <div class="form-block">
      <label for="projectId">{{ Locale.locale('project id') }}</label>
      <input type="text" name="projectId" id="projectId" v-model="projectId" required="required">
    </div>

    <div class="form-block">
      <label for="apiKey">{{ Locale.locale('apiKey') }}</label>
      <input type="text" name="apiKey" id="apiKey" v-model="apiKey" required="required">
    </div>


    <LoadingButton :is-loading="isSavingProject" :text="Locale.locale('submit')" @click="saveProject"/>
  </form>
</template>

<script setup lang="ts">
import type {PropType} from "vue";
import {computed, onMounted, ref} from "vue";
import Locale from "../locale/Locale";
import LoadingButton from "@/components/LoadingButton.vue";
import {useAppState} from "@/stores/State";
import {useToast} from "vue-toast-notification";
import Project from "@/models/Project";
import Server from "@/models/Server";

const emits = defineEmits(['close']);

const NO_SERVER = '-1';

const props = defineProps({
  project: {type: Object as PropType<Project>, required: true}
});

const state  = useAppState();
const $toast = useToast();

const currentServer = props.project!.server.title !== '' ? props.project!.server.title : undefined;

const server    = ref(currentServer ?? NO_SERVER);
const title     = ref(props.project!.title);
const apiKey    = ref(props.project!.apiKey);
const projectId = ref(props.project!.projectId);

const isSavingProject = ref(false);
const isEdit          = ref(false);

onMounted(() => {
  if (props.project!.title !== '') {
    isEdit.value = true;
  }
})

function addProject(project: Project) {
  if (state.app.projects.find(p => p.title === project.title) !== undefined) {
    $toast.error(Locale.locale('Project with this name already exists'));

    return;
  }

  insertProject(project);
}

function updateProject(project: Project) {
  state.app.projects.splice(state.app.projects.findIndex(p => p.title === props.project!.title), 1);

  insertProject(project);
}

function insertProject(project: Project) {
  state.app.projects.push(project);
  emits('close');
}

async function saveProject() {
  if (apiKey.value === '' || projectId.value === '' || title.value === '' || server.value === NO_SERVER) {
    $toast.error(Locale.locale('All fields must be filled'));

    return;
  }

  isSavingProject.value = true;

  const project = new Project(selectedServer.value, title.value, projectId.value, apiKey.value);

  if (await project.checkProject()) {
    if (isEdit.value) {
      updateProject(project);
    } else {
      addProject(project);
    }
  } else {
    $toast.error(Locale.locale('Cannot connect to project'));
  }

  isSavingProject.value = false;
}

const selectedServer = computed(() => state.app.servers.find(s => s.title === server.value) ?? new Server());

</script>
