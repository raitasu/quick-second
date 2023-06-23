import axios from 'axios'


export const instance = axios.create({
    baseURL: "https://suggestions.dadata.ru/suggestions/api/",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": "Token " + "cf5c209dc4c6caa19f0daed284af72edadec953a"
    }
})


