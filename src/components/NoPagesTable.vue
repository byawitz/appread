<template>
  <div class="table-holder">
    <table>
      <thead>
      <tr>
        <th v-for="heading in headings" :key="heading">{{ heading }}</th>

        <th>{{ Locale.locale('actions') }}</th>
      </tr>
      </thead>

      <tbody v-if="data.length > 0">
      <tr v-for="single in data" :key="single.title">
        <th v-for="df in dataFields" :key="`${single.title}-${df}`">

          <template v-if="codeableFields.includes(df)">
            <span class="code">{{ single[df] }}</span>
          </template>

          <template v-else-if="linkableFields.includes(df)">
            <a :href="Helper.makeSureHasHTTPS(single[df])" target="_blank">{{ single[df] }} <i class="fa fa-external-link"></i></a>
          </template>

          <template v-else>
            {{ single[df] }}
          </template>
        </th>

        <td>
          <div class="btn btn-green" @click="emits('edit',single.title)"><i class="fa fa-edit"></i></div>
          <div class="btn btn-red" @click="emits('delete',single.title)"><i class="fa fa-trash"></i></div>
        </td>
      </tr>
      </tbody>

      <tbody v-else>
      <tr>
        <td :colspan="dataFields.length + 1">
          <div class="no-items">
            <i class="fa fa-ban"></i>

            <h3>{{ Locale.localeReplace('No :items: found', [{what: ':items:', replace: resourceNamePlural}]) }}</h3>

            <h4>{{ Locale.locale('You can start by add one') }}</h4>
          </div>
        </td>
      </tr>
      </tbody>

      <tfoot>
      <tr>
        <th :colspan="dataFields.length + 1">
          <div>
            <div class="summary"><h4>{{ resourceNamePlural }}</h4> <h5>{{ Locale.locale('total') }}: <span>{{ data.length }}</span></h5></div>

            <div class="action">
              <div @click="emits('create')" class="btn btn-blue btn-text"><i class="fa fa-plus"></i> {{ Locale.locale('Add') }} {{ resourceName }}</div>
            </div>
          </div>
        </th>
      </tr>
      </tfoot>
    </table>
  </div>
</template>

<script setup lang="ts">
import type {PropType} from "vue";
import Locale from "../locale/Locale";
import Helper from "@/utils/Helper";

const emits = defineEmits(['edit', 'delete', 'create']);

defineProps({
  resourceName      : {type: String, required: true},
  resourceNamePlural: {type: String, required: true},
  headings          : {type: Object as PropType<String[]>, required: true},
  dataFields        : {type: Object as PropType<String[]>, required: true},
  data              : {type: Array, default: () => []},
});

const codeableFields = [
  'version'
];

const linkableFields = [
  'endpoint'
];
</script>

<style lang="scss" scoped>
@import "../assets/style/include/vars.scss";


.table-holder {
  border: 1px solid var(--border-color);
  border-radius: 15px;
  overflow: hidden;
  max-width: 1200px;

  table {
    width: 100%;

    tr td, tr th {
      padding: 10px;
    }

    thead th, tfoot th {
      background-color: var(--dark-background);
      padding: 15px 10px;
    }
  }


  tbody {
    tr {
      border-bottom: 1px solid var(--border-color);

      &:nth-child(odd) {
        background-color: var(--second-background-color);
      }
    }
  }


  tfoot tr th > div {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .summary {
      gap: 10px;
      align-items: baseline;
      display: flex;

    }

    h4 {
      font-weight: bold;
    }

  }
}

.no-items {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  gap: 15px;

  i {
    font-size: 60px;
  }

  h3 {
    font-size: 30px;
  }

  h4 {
    font-size: 20px;
  }
}

a i{
  display: inline-block;
  background-color: var(--dark-background);
  padding: 9px 9px;
  border-radius: 7px;
  border: 1px solid var(--border-color);
}
</style>