<template>
  <CoverUp :show="showForm" @close="showForm = false" :title="getTitle">
    <ActionForm :action="action"/>
  </CoverUp>

  <div class="big-search">
    <input type="text" :placeholder="Locale.locale('search_anything_action')">
  </div>

  <div id="actions-list">
    <div class="action add" @click="showForm = true" style="min-height: 200px;">
      <div class="add-action">
        <div class="aa-idle"><i class="fa fa-plus"></i></div>
        <div class="aa-over">{{ Locale.locale('add_action') }}</div>
      </div>
    </div>


    <SingleAction
        v-for="action in state.app.actions"
        :key="action.name"
        :type="action.type"
        :name="action.name"
        :scope="action.scope"
        :version="action.version"
        :project-name="action.projectName"
        @click="showAction"
    />
  </div>
</template>

<script setup lang="ts">
import Locale from "@/locale/Locale";
import {useAppState} from "@/stores/State";
import CoverUp from "@/components/CoverUp.vue";
import {ref} from "vue";
import Action from "@/models/Action";
import SingleAction from "@/components/SingleAction.vue";
import ActionForm from "@/sub-views/ActionForm.vue";

const state = useAppState();

const showForm = ref(false);
const getTitle = ref(Locale.locale('add_action'))

const action = ref<Action>(new Action());

function addAction() {

}

function deleteAction() {

}

function showAction() {

}

</script>