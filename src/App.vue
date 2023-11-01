<template>
  <div id="app">
    <TweetList />
  </div>
</template>

<script>
import TweetList from "./components/TweetList";

export default {
  name: "App",
  components: {
    TweetList,
  },
};
</script>
