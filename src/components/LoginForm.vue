<!-- src/components/LoginForm.vue -->
<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="login">
      <div>
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="username">
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password">
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
</template>
  
<script>
import { ref } from 'vue';
import axios from 'axios';
import { useUserStore } from '@/store';

export default {
  setup() {
    const username = ref('');
    const password = ref('');
    const userStore = useUserStore();  // Use Pinia store

    const login = async () => {
      try {
        const response = await axios.post("http://localhost:5000/api/login", {
          username: username.value,
          password: password.value,
        });

        userStore.setUser(response.data.user);
        console.log('User after login:', userStore.user);  // Add this line
        // ...
      } catch (error) {
        console.error("An error occurred while logging in:", error);
        alert('Failed to login.');
      }
    };

    return { username, password, login };
  },
};
</script>
