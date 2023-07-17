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
          <div class="fbs" :class="{'selected':!isServerScope}" @click="isServerScope = false">
            <div class="fbs-icon"><i class="fa fa-house"></i></div>
            <div class="fbs-title">{{ Locale.locale('client') }}</div>
          </div>

          <div class="fbs" :class="{'selected':isServerScope}" @click="isServerScope = true">
            <div class="fbs-icon"><i class="fa fa-server"></i></div>
            <div class="fbs-title">{{ Locale.locale('server') }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="form-block">
      <div class="form-block-switch">
        <div class="fbs-title">
          <p>{{ Locale.locale('API_module') }}</p>
        </div>

        <div class="fbs-options">
          <div class="fbs"
               v-for="(api, key) in apis"
               :class="{'selected':key.toString() === module}"
               :key="key"
               @click="module = key.toString()">
            <div class="fbs-icon"><i class="fa" :class="Action.iconForModule(key.toString())"></i></div>
            <div class="fbs-title">{{ key.toString().capitalize() }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="form-block">
      <label for="endpoint">{{ Locale.locale('endpoint') }}</label>

      <div class="select-holder">
        <select name="endpoint" id="endpoint" v-model="endpoint">
          <option :value="NO_SELECTION">{{ Locale.locale('select endpoint') }}</option>

          <option v-for="(theEndpoint,key) in endpoints" :value="key" :key="theEndpoint">{{ `${theEndpoint.method.toUpperCase()}: ${theEndpoint.summary} ` }}</option>
        </select>
      </div>
    </div>

    <div class="form-block" v-if="currentEndpoint">
      <label for="endpoint">{{ Locale.locale('Data') }}</label>

      <RequestData
          :currentEndpoint="currentEndpoint"
      />
    </div>

    <div class="form-block" v-if="currentEndpointParameters !== NO_PARAMETER">
      <label for="endpoint">{{ Locale.locale('Parameters') }}</label>

      <div>
        {{ currentEndpointParameters }}
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
import RequestData from "@/sub-views/RequestData.vue";

const props = defineProps<{ action: Action }>();
const state = useAppState();

const NO_SELECTION = '-1';
const NO_BODY_DATA = Locale.locale('no_body_data');
const NO_PARAMETER = Locale.locale('no_parameters');

const project = ref<string>('');
const title   = ref(props.action.name);

const module   = ref<string>(NO_SELECTION);
const endpoint = ref<string>(NO_SELECTION);

const isServerScope = ref<boolean>(false);

const isSavingAction = ref(false);
const isEdit         = ref(false);


function saveAction() {
  /* */
}


const version         = computed(() => selectedProject.value.server.version);
const scope           = computed(() => isServerScope.value ? 'server' : 'client')
const apis            = computed(() => Api.giveMeAPI(scope.value, version.value));
const endpoints       = computed(() => apis.value[module.value.toLowerCase()] ?? []);
const selectedProject = computed(() => state.app.projects.find((p) => p.title === project.value) ?? new Project());
const currentEndpoint = computed(() => {
  try {
    return endpoints.value[endpoint.value];
  } catch (e) {
    return false;
  }
});

const currentEndpointParameters = computed(() => {
  try {
    return endpoints.value[endpoint.value].parameters ?? NO_PARAMETER;
  } catch (e) {
    return NO_PARAMETER;
  }
});

watch(isServerScope, () => module.value = endpoint.value = NO_SELECTION);
watch(module, () => endpoint.value = NO_SELECTION);

onMounted(() => {
  console.log(Api.giveMeAPI('client', '1.3.7'));
  if (props.action.name !== '') {
    isEdit.value = true;
  }

  if (state.app.projects.length >= 1) {
    project.value = state.app.projects[0].title;
  }
});
</script>
