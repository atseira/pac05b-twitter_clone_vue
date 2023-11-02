// src/store/index.js
import { defineStore } from 'pinia';

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    user: null,
  }),
  actions: {
    login(user) {
      this.user = user;
    },
    setUser(user) {
      this.user = user;
    },
    logout() {
      this.user = null;
    },
  },
});
