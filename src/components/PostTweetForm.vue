<!-- src/components/PostTweetForm.vue -->
<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Post a Tweet
        </h2>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="postTweet">
        <div class="rounded-md shadow-sm">
          <div>
            <label for="content" class="sr-only">Tweet:</label>
            <textarea id="content" v-model="content" rows="4" class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="What's happening?"></textarea>
          </div>
        </div>
        <div>
          <button type="submit" :disabled="!userStore.user" class="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Post Tweet
          </button>
        </div>
      </form>
      <div v-if="!userStore.user" class="text-center">
        Please <router-link to="/login" class="text-indigo-600 hover:text-indigo-500">login</router-link> to post a tweet.
      </div>
    </div>
  </div>
</template>


<script>
import { ref } from 'vue';
import { useUserStore } from '@/store';  // Import user store
import axios from 'axios';

export default {
  setup() {
    const content = ref('');
    const userStore = useUserStore();
    console.log('Token:', userStore.token); 
    const postTweet = async () => {
      try {
        if (!userStore.user) {  // Check if user is logged in
          alert('Please login to post a tweet');
          return;
        }

        const headers = {
          'Authorization': `Bearer ${userStore.token}`, // Include the token here
          'Content-Type': 'application/json',
        };

        await axios.post('http://localhost:5000/api/post-tweet', { content: content.value }, { headers: headers });
        alert('Tweet posted successfully');
        content.value = '';
      } catch (error) {
        console.error('Failed to post tweet:', error);
      }
    };

    return { content, postTweet, userStore };
  },
};
</script>
