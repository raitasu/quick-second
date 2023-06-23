import {Employee, Sorting} from "@/components/Employees/types";

export const sortEmployees = (employees: Array<Employee>, sorting: Sorting) => {


    if (!sorting.field) return employees

    if (sorting.field === 'age') {
        const compareFn = sorting.order === 'asc' ? (a, b) => a[sorting.field] - b[sorting.field] : (a, b) => b[sorting.field] - a[sorting.field]

        return employees.sort(compareFn)
    }
    if (sorting.field === 'name') {
        const compareFn = sorting.order === 'asc' ? (a, b) => a[sorting.field].localeCompare(b[sorting.field]) : (a, b) => b[sorting.field].localeCompare(a[sorting.field])

        return employees.sort(compareFn)
    }


}
