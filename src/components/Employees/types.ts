export type Employee = {
    id?: number
    name: string
    age: number
    location: Array<Number>
    boss: number | null
    children: Array<Employee>
}