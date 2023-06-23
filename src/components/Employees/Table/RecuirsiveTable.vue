<script setup lang="ts">
import {YandexMap, YandexMarker} from 'vue-yandex-maps'

import {ref} from "vue";
import {Employee} from "@/components/Employees/types";


defineProps({
  employees: Array<Employee>
})

const mapSettings = {
  apiKey: '5e8fe631-331c-4f89-bd79-423bf0f93de7',
  lang: 'ru_RU'
}

const fields = [{key: 'name', sortable: true}, {key: 'age', sortable: true}, {key: 'location'}, {key: 'subordinates'}]

const isShowLocation = ref(false);
const selectedLocation = ref([]);

const openLocation = (location: Array<number>) => {
  selectedLocation.value = location;
  isShowLocation.value = true;
}

const childrenVisibility = ref({});

const toggleShowChildren = (employeeId: number) => {
  childrenVisibility.value[employeeId] = !childrenVisibility.value[employeeId];
};

const isChildrenVisible = (employeeId: number) => {
  return childrenVisibility.value[employeeId];
};


const sortDesc = ref(false)
const sortBy = ref('age')

</script>

<template>
  <div>
    <b-table :items="employees" :fields="fields" striped responsive="sm" v-model:sort-desc="sortDesc" :sort-by="sortBy">
      <template #head(name)="row">
        <div @click="sortBy = 'name'">
          Name
        </div>
      </template>
      <template #head(age)="row">
        <div @click="sortBy = 'age'">
          Age
        </div>
      </template>
      <template #cell(location)="row">
        <b-button size="sm" @click="() => openLocation(row.item.location)" class="mr-2">
          Show location
        </b-button>
      </template>
      <template #cell(subordinates)="row">
        <b-button size="sm" :disabled="row.item.children.length === 0"
                  @click="toggleShowChildren(row.item.id)">
          {{ isChildrenVisible(row.item.id) ? 'Hide subordinates' : 'Show subordinates' }}
        </b-button>
        <div v-if="isChildrenVisible(row.item.id)">

          <RecuirsiveTable :employees="row.item.children"/>

        </div>
      </template>
    </b-table>

  </div>
  <b-modal size="lg" v-model="isShowLocation" hide-footer>
    <div id="map">
      <yandex-map v-if="isShowLocation" style="width: 100%; height: 300px" :coordinates="selectedLocation"
                  :settings="mapSettings">
        <yandex-marker :coordinates="selectedLocation" :marker-id="123"/>
      </yandex-map>
    </div>
  </b-modal>
</template>