<!-- src/App.vue -->
<template>
  <div id="app">
    <nav>
      <!-- Show Hi {username} when user is logged in -->
      <div>
        <router-link to="/">Home</router-link>
      </div>
      <span v-if="$store.state.user">
        Hi {{ $store.state.user.username }}
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
export default {
  name: 'App',
  data() {
    return {
      user: null,  // Store user data here
    };
  },
  methods: {
    logout() {
      this.$store.commit('logout');
    }
  }
};
</script>
