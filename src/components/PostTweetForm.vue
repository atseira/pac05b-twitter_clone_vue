<!-- src/components/PostTweetForm.vue -->
<template>
    <div>
      <h3>Post a Tweet</h3>
      <form @submit.prevent="postTweet">
        <div>
          <label for="content">Tweet:</label>
          <input type="text" id="content" v-model="content" required>
        </div>
        <button type="submit">Post</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    name: "PostTweetForm",
    data() {
      return {
        content: "",
      };
    },
    methods: {
      async postTweet() {
        try {
          const response = await axios.post("http://localhost:5000/api/post_tweet", {
            content: this.content,
          });
          console.log(response.data);
          this.content = "";  // Clear the input field
          alert('Tweet posted successfully!');
          // Optionally: You might want to refresh the tweet list or navigate to a different page
        } catch (error) {
          console.error("An error occurred while posting the tweet:", error);
          alert('Failed to post tweet.');
        }
      },
    },
  };
  </script>
  