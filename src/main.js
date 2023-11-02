// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';
import { createPinia } from 'pinia';  // Import Pinia

axios.defaults.withCredentials = true;

const app = createApp(App);
app.use(router);
app.use(createPinia()); 
app.mount('#app');
