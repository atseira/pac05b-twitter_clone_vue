<!-- src/components/PostTweetForm.vue -->
<template>
  <div>
    <h2>Post a Tweet</h2>
    <form @submit.prevent="postTweet">
      <div>
        <label for="content">Tweet:</label>
        <input type="text" id="content" v-model="content">
      </div>
      <button type="submit" :disabled="!userStore.user">Post Tweet</button>
    </form>
    <div v-if="!userStore.user">
      Please <router-link to="/login">login</router-link> to post a tweet.
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

    const postTweet = async () => {
      try {
        if (!userStore.user) {  // Check if user is logged in
          alert('Please login to post a tweet');
          return;
        }
        await axios.post('http://localhost:5000/api/post-tweet', { content: content.value });
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
