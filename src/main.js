import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';
import { createPinia } from 'pinia';
import { useUserStore } from './store';
import './styles.css';

const app = createApp(App);
app.use(router);
const pinia = createPinia();
app.use(pinia);

axios.defaults.withCredentials = true;
axios.interceptors.request.use((config) => {
    // Access the store within the interceptor
    const token = useUserStore(pinia).token;
    console.log('Sending token:', token);  // Log the token here
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }, (error) => {
    return Promise.reject(error);
  });

app.mount('#app');
  