<script setup lang="ts">
import {useStore} from "vuex";
import {computed, ref, defineProps} from "vue";


interface SortingProps {
  columnName: string
}

const props = defineProps<SortingProps>()
const store = useStore()
const sorting = computed(() => store.getters.getSorting)
const order = ref('asc')


const setSorting = (newOrder: 'asc' | 'desc') => {
  order.value = newOrder
  store.dispatch('setSorting', {field: props.columnName, order: newOrder})
}


</script>
<template>
  <i class="bi-arrow-up" v-if="order ==='asc'" @click="() => setSorting('desc')"></i>
  <i class="bi-arrow-down" v-if="order ==='desc'" @click="() => setSorting('asc')"></i>
</template>