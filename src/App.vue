<!-- src/App.vue -->
<template>
  <div id="app">
    <nav>
      <!-- Show Hi {username} when user is logged in -->
      <div>
        <router-link to="/">Home</router-link>
      </div>
      <span v-if="userStore.user">
        Hi {{ userStore.user.username }}
        <button @click="logout">Logout</button>
        <router-link to="/post-tweet">Post Tweet</router-link>
      </span>
      <span v-else>
        <!-- Change Login to Logout when user is logged in -->
        <router-link to="/login">Login</router-link> |
      </span>
    </nav>
    <!-- Pass user data as props -->
    <router-view />
  </div>
</template>

<script>
import { useUserStore } from '@/store';

export default {
  name: 'App',
  setup() {
    const userStore = useUserStore();

    const logout = () => {
      userStore.logout();
    };

    return { userStore, logout };
  },
};
</script>
