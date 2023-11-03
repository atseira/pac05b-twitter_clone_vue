<template>
  <div class="grid grid-cols-1 gap-4 p-4">
    <div v-for="tweet in tweets" :key="tweet.id" class="bg-white p-6 rounded-lg shadow-md">
      <h2 class="text-xl font-semibold mb-2">{{ tweet.username }}</h2>
      <p class="text-gray-600 mb-2">{{ tweet.content }}</p>
      <div class="flex items-center">
        <button :disabled="!userStore.user" @click="likeTweet(tweet.id)"
          class="text-blue-500 hover:text-blue-600 focus:outline-none">
          Like
        </button>
        <span class="ml-2 text-sm text-gray-500">{{ tweet.likes }} {{ tweet.likes === 1 ? 'Like' : 'Likes' }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import axios from "axios";
import { useUserStore } from "@/store";

export default {
  name: "TweetList",
  data() {
    return {
      tweets: [],
    };
  },
  async created() {
    try {
      const response = await axios.get("http://localhost:5000/api/tweets");
      console.log("API Response:", response.data);
      this.tweets = response.data.tweets;
    } catch (error) {
      console.error("An error occurred while fetching data: ", error);
    }
  },
  methods: {
    async likeTweet(tweetId) {
      try {
        const headers = {
          'Authorization': `Bearer ${this.userStore.token}`, // Include the token here
          'Content-Type': 'application/json',
        };

        const response = await axios.post(`http://localhost:5000/api/tweets/${tweetId}/like`, {}, { headers: headers });
        console.log("Like Response:", response.data);
        // Updating the like count in the UI
        const tweet = this.tweets.find(t => t.id === tweetId);
        if (tweet) {
          Vue.set(tweet, 'likes', response.data.likes);
        }
      } catch (error) {
        console.error("An error occurred while liking the tweet: ", error);
      }
    }
  },
  setup() {
    // Accessing the user store to check if the user is logged in
    const userStore = useUserStore();
    return { userStore };
  }
};
</script>

<style scoped>
/* Style Section Will Go Here */
</style>
