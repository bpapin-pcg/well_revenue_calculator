import { createApp } from "vue";
import App from "./App.vue";
import {createPinia} from "pinia";
import axios from 'axios';
import VueAxios from 'vue-axios';
import '/dist/output.css';
import vClickOutside from "click-outside-vue3";
import router from './router'

const app = createApp(App);
app.use(createPinia());
app.use(VueAxios, axios);
app.use(vClickOutside);
app.use(router);
app.mount("#app");
