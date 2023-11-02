// src/router.js
import { createRouter, createWebHistory } from 'vue-router';
import TweetList from './components/TweetList.vue';
import LoginForm from './components/LoginForm.vue';
import PostTweetForm from './components/PostTweetForm.vue';

const routes = [
    { path: '/', component: TweetList },
    { path: '/login', component: LoginForm },
    { path: '/post-tweet', component: PostTweetForm },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
