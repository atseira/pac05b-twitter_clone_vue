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
  const token = useUserStore(pinia).token;
  console.log('Sending token:', token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

const userStore = useUserStore(pinia);

// Fetch the current user data on page reload
if (userStore.token) {
  axios.get('http://localhost:5000/api/me')
    .then(response => {
      console.log('API /me response:', response.data);  // Log the entire API response
      userStore.setUser(response.data.user);
      console.log('User rehydrated:', response.data.user);
    })
    .catch(error => {
      console.error('Failed to fetch user:', error);
      userStore.logout();
    });
}

app.mount('#app');
