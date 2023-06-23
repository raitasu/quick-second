<script setup lang="ts">
import {computed} from 'vue';
import RecuirsiveRow from "@/components/Employees/Table/RecuirsiveRow.vue";
import SortingIcon from "@/components/Employees/Table/SortingIcon.vue";
import {sortEmployees} from "../utils.ts";
import {useStore} from "vuex";


const store = useStore()
const employees = computed(() => store.getters.getEmployees)
const sorting = computed(() => store.getters.getSorting)

const rootEmployees = computed(() => sortEmployees(employees.value.filter(item => !item.boss), sorting.value))

</script>

<template>
  <div>
    <table class="table">
      <thead>
      <tr>
        <th>Full name
          <SortingIcon columnName="name"/>
        </th>
        <th>Age
          <SortingIcon columnName="age"/>
        </th>
        <th>Location</th>
      </tr>
      </thead>
      <tbody>
      <RecuirsiveRow v-for="(employee) in rootEmployees"
                     :employee="employee"
                     :key="employee.id"
                     :nestingLevel=1
                     :sorting="sorting"
      />
      </tbody>
    </table>
  </div>
</template>

<style>
.table {
  width: 100%;
  margin-bottom: 20px;
  border: 1px solid #dddddd;
  border-collapse: collapse;
}

.table th {
  font-weight: bold;
  padding: 5px;
  background: #efefef;
  border: 1px solid #dddddd;
}

</style>
