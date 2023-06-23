<script setup lang="ts">
import {defineProps, ref} from "vue";
import {Employee, Sorting} from "@/components/Employees/types";
import {YandexMap, YandexMarker} from 'vue-yandex-maps'
import {sortEmployees} from "../utils.ts";


interface Props {
  employee: Employee
  nestingLevel: number,
  sorting: Sorting
}


defineProps<Props>();

const mapSettings = {
  apiKey: '5e8fe631-331c-4f89-bd79-423bf0f93de7',
  lang: 'ru_RU'
}

const isShowLocation = ref(false);

const selectedLocation = ref([]);

const openLocation = (location: Array<number>) => {
  selectedLocation.value = location;
  isShowLocation.value = true;
}

</script>

<template>
  <tr>
    <td :style="`padding-left: ${nestingLevel}0px`">{{ employee.name }}</td>
    <td>{{ employee.age }} </td>
    <td>
      <b-button size="sm" @click="() => openLocation(employee.location)" class="mr-2">
        Show location
      </b-button>
    </td>
  </tr>
  <RecuirsiveRow v-if="employee.children"
                 v-for="(childEmployee) in sortEmployees(employee.children, sorting)"
                 :employee="childEmployee"
                 :key="childEmployee.id"
                 :nestingLevel="nestingLevel+1"
                 :sorting="sorting"
  />
  <b-modal size="lg" v-model="isShowLocation" hide-footer>
    <div id="map">
      <yandex-map v-if="isShowLocation" style="width: 100%; height: 300px" :coordinates="selectedLocation"
                  :settings="mapSettings">
        <yandex-marker :coordinates="selectedLocation" :marker-id="123"/>
      </yandex-map>
    </div>
  </b-modal>
</template>

<style>
</style>