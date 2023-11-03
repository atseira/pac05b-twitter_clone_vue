<!-- src/components/LoginForm.vue -->
<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Login
        </h2>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="login">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="username" class="sr-only">Username:</label>
            <input type="text" id="username" v-model="username" required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Username">
          </div>
          <div>
            <label for="password" class="sr-only">Password:</label>
            <input type="password" id="password" v-model="password" required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Password">
          </div>
        </div>
        <div>
          <button type="submit"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Login
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

  
<script>
import { ref } from 'vue';  // Add useRouter import here
import axios from 'axios';
import { useUserStore } from '@/store';
// import { useRouter } from 'vue-router';


export default {
  setup() {
    const username = ref('');
    const password = ref('');
    // const router = useRouter();  // Use useRouter to get the router instance

    const login = async () => {
      try {
        const response = await axios.post("http://localhost:5000/api/login", {
          username: username.value,
          password: password.value,
        }, { withCredentials: true });

        console.log('Login Response:', response.data);

        const token = response.data.access_token;

        // Set the token and user in the user store
        const userStore = useUserStore();
        userStore.login({ username: username.value }, token);
        console.log('Token after login:', userStore.token);  // Log the token after saving

        // Redirect to home page
        // router.push('/');  // Use router directly instead of this.$router

      } catch (error) {
        console.error('An error occurred while logging in:', error);
      }
    };

    return { username, password, login };
  },
};
</script>





