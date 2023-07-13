<template>
  <form @submit="saveAction">
    <div class="form-block">
      <label for="title">{{ Locale.locale('title') }}</label>
      <input type="text" name="title" id="title" v-model="title" required>
    </div>

    <div class="form-block">
      <label for="project">{{ Locale.locale('project') }}</label>

      <div class="select-holder">
        <select name="project" id="project" v-model="project">
          <option :value="NO_SELECTION">{{ Locale.locale('select project') }}</option>

          <option
              v-for="project in state.app.projects"
              :key="project.title"
              :value="project.title">{{ project.title }}
          </option>
        </select>
      </div>
    </div>

    <div class="form-block">
      <div class="form-block-switch">
        <div class="fbs-title">
          <p>{{ Locale.locale('select_action_scope') }}</p>
        </div>

        <div class="fbs-options">
          <div class="fbs" :class="{'selected':isServerScope}" @click="isServerScope = true">
            <div class="fbs-icon"><i class="fa fa-server"></i></div>
            <div class="fbs-title">{{ Locale.locale('server') }}</div>
          </div>

          <div class="fbs" :class="{'selected':!isServerScope}" @click="isServerScope = false">
            <div class="fbs-icon"><i class="fa fa-house"></i></div>
            <div class="fbs-title">{{ Locale.locale('client') }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="form-block">
      <label for="api_module">{{ Locale.locale('API_module') }}</label>
      <!-- TODO: Change to grid select -->
      <div class="select-holder">
        <select name="api_module" id="api_module" v-model="module">
          <option :value="NO_SELECTION">{{ Locale.locale('select API module') }}</option>

          <option v-for="(api, key) in apis" :key="key">{{ (key as string).capitalize() }}</option>
        </select>
      </div>
    </div>

    <div class="form-block">
      <label for="endpoint">{{ Locale.locale('endpoint') }}</label>
      <!-- TODO: Change to grid select -->
      <div class="select-holder">
        <select name="endpoint" id="endpoint" v-model="endpoint">
          <option :value="NO_SELECTION">{{ Locale.locale('select endpoint') }}</option>

          <option v-for="endpoint in endpoints" :key="endpoint">{{ `${endpoint.method}: ${endpoint.summary} ` }}</option>
        </select>
      </div>
    </div>

    <LoadingButton :is-loading="isSavingAction" :text="Locale.locale('submit')" @click="saveAction"/>
  </form>
</template>

<script setup lang="ts">
import Api from "@/api/Api";
import Action from "@/models/Action";
import Locale from "../locale/Locale";
import Project from "@/models/Project";
import {useAppState} from "@/stores/State";
import {computed, onMounted, ref, watch} from "vue";
import LoadingButton from "@/components/LoadingButton.vue";

const props = defineProps<{ action: Action }>();
const state = useAppState();

const NO_SELECTION = '-1';

const project = ref<string>('');
const title   = ref(props.action.name);

const module   = ref<string>(NO_SELECTION);
const endpoint = ref<string>(NO_SELECTION);

const isServerScope = ref<boolean>(false);

const isSavingAction = ref(false);
const isEdit         = ref(false);

onMounted(() => {
  if (props.action.name !== '') {
    isEdit.value = true;
  }

  if (state.app.projects.length >= 1) {
    project.value = state.app.projects[0].title;
  }
})

function saveAction() {
  /* */
}

const version         = computed(() => selectedProject.value.server.version);
const scope           = computed(() => isServerScope.value ? 'server' : 'client')
const apis            = computed(() => Api.giveMeAPI(scope.value, version.value));
const endpoints       = computed(() => apis.value[module.value.toLowerCase()] ?? []);
const selectedProject = computed(() => state.app.projects.find((p) => p.title === project.value) ?? new Project());
</script>
