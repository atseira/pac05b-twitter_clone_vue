// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';
import { store } from './store';  // Import the store

axios.defaults.withCredentials = true;

const app = createApp(App);
app.use(router);
app.use(store);  // Use the store
app.mount('#app');
