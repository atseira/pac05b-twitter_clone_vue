<!-- src/App.vue -->
<template>
  <div id="app">
    <nav class="bg-blue-600 p-4 text-white">
      <div class="container mx-auto flex justify-between items-center">
        <router-link to="/" class="text-2xl font-bold text-white hover:text-gray-200">
          Home
        </router-link>
        <div class="flex items-center">
          <span v-if="userStore.user" class="mr-4">
            Hi {{ userStore.user.username }}
          </span>
          <span v-if="userStore.user" class="mr-4">
            <button @click="logout" class="bg-red-500 px-4 py-2 rounded text-white hover:bg-red-400">
              Logout
            </button>
          </span>
          <span v-if="userStore.user" class="mr-4">
            <router-link to="/post-tweet" class="text-white hover:text-gray-200">
              Post Tweet
            </router-link>
          </span>
          <span v-else class="mr-4">
            <router-link to="/login" class="text-white hover:text-gray-200">
              Login
            </router-link>
          </span>
        </div>
      </div>
    </nav>
    <router-view />
  </div>
</template>


<script>
import { useUserStore } from '@/store';
import axios from 'axios';

export default {
  name: 'App',
  setup() {
    const userStore = useUserStore();

    const logout = async () => {
      try {
        await axios.post('http://localhost:5000/api/logout');  // Call the new logout endpoint
        userStore.logout();
        alert('Logged out successfully');
      } catch (error) {
        console.error('Failed to logout:', error);
      }
    };

    return { userStore, logout };
  },
};
</script>
