<script setup>
import {useStore} from "vuex";
import {computed} from "vue";
import RecuirsiveTable from "./RecuirsiveTable.vue";

const store = useStore();
const employees = computed(() => store.getters.getEmployees)

</script>
<template>
  <RecuirsiveTable :employees="employees"/>
</template>
<style></style>
