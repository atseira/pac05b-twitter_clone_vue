<template>
  <div>
    <h1>Tweets</h1>
    <ul>
      <li v-for="tweet in tweets" :key="tweet.id">
        {{ tweet.content }} by {{ tweet.username }}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";

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
      console.log("API Response:", response.data);  // Add this line
      this.tweets = response.data.tweets;
    } catch (error) {
      console.error("An error occurred while fetching data: ", error);
    }
  }
};
</script>
<style scoped>
/* Style Section Will Go Here */
</style>
