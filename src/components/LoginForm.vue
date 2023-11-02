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
import axios from "axios";

export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post("http://localhost:5000/api/login", {
          username: this.username,
          password: this.password,
        });
        // Emit user data to parent component
        this.$emit("login-success", response.data.user);
        this.$store.commit('setUser', response.data.user); 
      } catch (error) {
        console.error("An error occurred while logging in:", error);
        alert('Failed to login.');
      }

    },
  },
};
</script>
  