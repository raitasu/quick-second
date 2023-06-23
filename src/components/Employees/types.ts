import {DaDataSuggestions} from "vue-dadata-3/dist/types";

export type Employee = {
    id?: number
    name: string
    age: number
    location: Array<Number>
    boss: number | null
    children: Array<Employee>
    suggestion: Array<DaDataSuggestions>
}


export type Sorting = {
    field: 'name' | 'age' | null,
    order: 'asc' | 'desc'
}