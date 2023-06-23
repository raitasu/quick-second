<script setup lang="ts">
import {YandexMap, YandexMarker} from 'vue-yandex-maps'
import {computed, ComputedRef, reactive, ref} from "vue";
import "../../custom.css";
import {useStore} from "vuex";
import {Employee} from "@/components/Employees/types";
import {instance} from "@/api";
import TheTable from "@/components/Employees/Table/TheTable.vue";

const mapSettings = {
  apiKey: '5e8fe631-331c-4f89-bd79-423bf0f93de7',
  lang: 'ru_RU'
}

const store = useStore();

const employees = computed(() => store.getters.getEmployees)

const employee: Employee = reactive({
  name: '',
  age: 18,
  location: [57, 28],
  children: [],
  boss: null,
  suggestion: []
})
const selectedBoss = ref(null);

const changeLocation = (e) => (employee.location = e.get('coords'));

const addBossForEmployee = () => {
  employee.boss = selectedBoss.value
}
const bossesOptions = computed(() => {

  return [{value: null, text: 'No boss'}, ...(employees.value || []).map((employee) => {

    return {value: employee.id, text: employee.name}
  })]
})
const modal = ref(false);

const openModal = () => {
  modal.value = true;
};


const checkFormValidity = () => {
  const nameState = employee.name.trim() !== '';
  const ageState = Number.isInteger(Number(employee.age)) && employee.age >= 18 && employee.age <= 100;

  return {
    name: nameState,
    age: ageState
  };

}
const errorState = ref(true)

const isValid = computed(() => {
  if (employee.name.length >= 1) {
    errorState.value = false
  }
  return checkFormValidity();
});

const isFormValid: ComputedRef<boolean> = computed(() => {
  return Object.values(isValid.value).every((valid) => valid)
})

const resetModal = (employee) => {
  employee.name = ''
  employee.age = 18
  employee.location = [57, 28]
  employee.boss = null
  selectedBoss.value = null
  errorState.value = true
}

const addEmployee = () => {
  store.dispatch('addEmployee', {parentId: employee.boss, employee})
  resetModal(employee)
}

const getSuggestions = async (value: string) => {
  const endpoint = "4_1/rs/suggest/fio";
  const query = value;

  try {
    const response = await instance.post(endpoint, {query});
    const suggestions = response.data.suggestions;
    employee.suggestion = suggestions.map(
        (name) => name.value
    );
  } catch (error) {
    console.error(error);
  }
};

</script>
<template>
  <div class="d-flex justify-content-center align-items-center mt-3 mb-xxl-5">
    <div class="d-flex align-items-center gap-5 ">
      <h2>Add an employee to the table.</h2>
      <b-button @click="openModal">Add employee</b-button>
    </div>
    <b-modal size="lg" v-model="modal" @ok="addEmployee" :ok-disabled="!isFormValid">
      <form>
        <div class="d-flex flex-column gap-2">
          <div class="d-flex  align-items-center">
            <div class="item">Full name:</div>
            <div class="d-flex flex-column w-100">
              <b-form-input type="text"
                            v-model="employee.name"
                            :state="errorState ? true : isValid.name"
                            @input="getSuggestions"
                            placeholder="Enter your full name"
                            list="fullname's-list"
                            required/>
              <datalist id="fullname's-list" class="w-100">
                <option
                    v-for="(suggest) in employee.suggestion"
                    :key="suggest"
                >
                  {{ suggest }}
                </option>
              </datalist>
              <b-form-invalid-feedback :state="errorState ? true : isValid.name">
                Full name is required.
              </b-form-invalid-feedback>
            </div>
          </div>
          <div class="d-flex justify-content-around align-items-center">
            <div class="item">Age:</div>
            <div class="d-flex flex-column w-100">
              <b-form-input type="number"
                            v-model="employee.age"
                            min="18"
                            max="100"
                            placeholder="Enter your age"
                            :state="isValid.age"/>
              <b-form-invalid-feedback :state="isValid.age">
                The age must be an integer and greater than 18 and less than 100.
              </b-form-invalid-feedback>
            </div>
          </div>
          <div class="d-flex justify-content-start align-items-center">
            <div class="item">Location:</div>
            <div id="map" style="width: 660px; height: 300px">
              <yandex-map style="width: 100%; height: 300px"
                          v-if="true"
                          :coordinates="employee.location"
                          @click="changeLocation"
                          :settings="mapSettings">
                <yandex-marker :coordinates="employee.location" :marker-id="123"/>
              </yandex-map>
            </div>
          </div>
          <div class="d-flex justify-content-around align-items-center">
            <div class="item">Boss:</div>
            <b-form-select v-model="selectedBoss" :options="bossesOptions" @change="addBossForEmployee"></b-form-select>
          </div>
        </div>
      </form>
    </b-modal>
  </div>
  <TheTable/>
</template>
<style>
.item {
  width: 100px;
}
</style>