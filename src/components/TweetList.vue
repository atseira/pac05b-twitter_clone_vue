<template>
  <div>
    <div class="grid grid-cols-1 gap-4 p-4">
      <div v-for="tweet in tweets" :key="tweet.id" class="bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-xl font-semibold mb-2">{{ tweet.username }}</h2>
        <p class="text-gray-600 mb-2">{{ tweet.content }}</p>
        <!-- Conditionally display image -->
        <div v-if="tweet.image_url" class="mb-2">
          <img :src="tweet.image_url" alt="Tweet image" class="rounded w-full h-auto" />
        </div>
        <div class="flex items-center">
          <button :disabled="!userStore.user" @click="toggleLike(tweet)"
            :class="{ 'text-blue-500': !tweet.liked, 'text-red-500': tweet.liked }"
            class="hover:text-blue-600 focus:outline-none">
            {{ tweet.liked ? 'Unlike' : 'Like' }}
          </button>
          <span class="ml-2 text-sm text-gray-500">{{ tweet.likes }} {{ tweet.likes === 1 ? 'Like' : 'Likes' }}</span>
        </div>
      </div>
    </div>
    <!-- Pagination Controls -->
    <div class="flex justify-center mt-4">
      <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1">Previous</button>
      <span class="mx-2">{{ currentPage }}</span>
      <button @click="changePage(currentPage + 1)" :disabled="tweets.length < itemsPerPage">Next</button>
    </div>
  </div>
</template>
  
<script>
import axios from "axios";
import { useUserStore } from "@/store";

export default {
  name: "TweetList",
  data() {
    return {
      tweets: [],
      currentPage: 1,       // New property
      itemsPerPage: 10       // New property
    };
  },
  async created() {
    await this.fetchTweets();
  },
  methods: {
    async fetchTweets() {
      try {
        const response = await axios.get(`http://localhost:5000/api/tweets?page=${this.currentPage}&per_page=${this.itemsPerPage}`);
        console.log("API Response:", response.data);
        this.tweets = response.data.tweets;
      } catch (error) {
        console.error("An error occurred while fetching data: ", error);
      }
    },
    async toggleLike(tweet) {
      try {
        const headers = {
          'Authorization': `Bearer ${this.userStore.token}`,
          'Content-Type': 'application/json',
        };

        const response = await axios.post(`http://localhost:5000/api/tweets/${tweet.id}/like`, {}, { headers: headers });
        console.log("Like/Unlike Response:", response.data);
        // Find the index of the tweet to update
        const tweetIndex = this.tweets.findIndex(t => t.id === tweet.id);

        // Update the tweet in the array
        this.tweets[tweetIndex] = {
          ...tweet,
          likes: response.data.likes,
          liked: response.data.message === 'Tweet liked'
        };
      } catch (error) {
        console.error("An error occurred while toggling the like status: ", error);
      }
    },

    async changePage(newPage) {
      this.currentPage = newPage;
      await this.fetchTweets();
    }
  },
  setup() {
    const userStore = useUserStore();
    return { userStore };
  }
};
</script>

<style scoped>
/* Style Section Will Go Here */
</style>
