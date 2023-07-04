<template>
  <CoverUp :show="showForm" @close="showForm = false" :title="getTitle">
    <ProjectForm :project="project" @close="showForm = false"/>
  </CoverUp>

  <NoPagesTable
      :data="state.app.projects"
      :headings="Project.headings()"
      :data-fields="Project.dataFields()"

      :resource-name="Locale.locale('project')"
      :resource-name-plural="Locale.locale('projects')"

      @edit="editProject"
      @create="createProject"
      @delete="deleteProject"
  />
</template>

<script setup lang="ts">
import NoPagesTable from "@/components/NoPagesTable.vue";
import Locale from "@/locale/Locale";
import {useAppState} from "@/stores/State";
import CoverUp from "@/components/CoverUp.vue";
import {computed, ref} from "vue";
import Alert from "@/utils/Alert";
import Project from "@/models/Project";
import ProjectForm from "@/sub-views/ProjectForm.vue";

const showForm = ref(false);
const project  = ref<Project>(new Project());

const state = useAppState();

function createProject() {
  project.value  = new Project();
  showForm.value = !showForm.value;

}

function editProject(title: string) {
  project.value  = state.app.projects.find(project => project.title === title) ?? new Project();
  showForm.value = true;
}

function deleteProject(title: string) {
  Alert.confirm(`${Locale.locale('Deleting')} ${title}?`, Locale.locale('This action cannot be undone'), Locale.locale('Delete'), () => {

    state.app.projects.splice(state.app.projects.findIndex(project => project.title === title), 1);
  });
}

const getTitle = computed(() => project.value.title !== '' ? Locale.locale('Update Project') : Locale.locale('Create Project'));

</script>