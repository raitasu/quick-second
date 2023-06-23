import {createStore} from "vuex";
import {Employee} from "../components/Employees/types.ts";

export default createStore({
    state: {
        employees: [] as Array<Employee>
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
        }
    },
    actions: {
        addEmployee({commit}, payload) {
            commit('ADD_EMPLOYEE', payload)
        }
    },
    getters: {
        getEmployees(state) {
            return state.employees
        }
    }
})