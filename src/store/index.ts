import {createStore} from "vuex";
import {Employee, Sorting} from "../components/Employees/types.ts";

export default createStore({
    state: {
        employees: [] as Array<Employee>,
        sorting: {
            field: null,
            order: 'asc'
        } as Sorting
    },
    mutations: {
        ADD_EMPLOYEE(state, {parentId, employee}) {
            const newEmployee = {id: Math.floor(Date.now()), ...employee};
            const employeesCopy = [...state.employees];

            if (parentId !== null) {
                const parent = employeesCopy.find((employee) => employee.id === parentId);
                if (parent) {
                    parent.children = [...parent.children, newEmployee];
                }
            }

            state.employees = [...employeesCopy, newEmployee];
        },
        SET_SORTING(state, {field, order}) {

            state.sorting = {field, order}

        }
    },
    actions: {
        addEmployee({commit}, payload) {
            commit('ADD_EMPLOYEE', payload)
        },
        setSorting({commit}, payload) {
            commit('SET_SORTING', payload)
        }
    },
    getters: {
        getEmployees(state) {
            return state.employees
        },
        getSorting(state) {
            return state.sorting
        }
    }
})