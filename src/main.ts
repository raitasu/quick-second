import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import DaDataNext from 'vue-dadata-3';
import BootstrapVueNext from "bootstrap-vue-next";
import VDrilldownTable from 'vuetify-drilldown-table';
import 'bootstrap/dist/css/bootstrap.css'
import "bootstrap-vue-next/dist/bootstrap-vue-next.css";
import 'vuetify/dist/vuetify.min.css'
import store from "./store";

const app = createApp(App)

app.use(store)

app.use(router)

app.component('VDrilldownTable', VDrilldownTable);

app.use(DaDataNext, {
    token: 'cf5c209dc4c6caa19f0daed284af72edadec953a'
})

app.use(BootstrapVueNext)

app.mount('#app')
