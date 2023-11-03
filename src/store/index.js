// src/store/index.js
import { defineStore } from 'pinia';

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || null,
  }),
  actions: {
    login(user, token) {
      this.setUser(user);
      this.setToken(token);
    },
    setUser(user) {
      this.user = user;
    },
    setToken(token) {
      this.token = token;
      localStorage.setItem('token', token);
    },
    logout() {
      this.user = null;
      this.token = null;
      localStorage.removeItem('token');
    },
  },
});
