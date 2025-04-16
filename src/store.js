// store.js
import { defineStore } from 'pinia';

export const useMainStore = defineStore('main', {
  state: () => ({
    globalCounter: 0
  }),
  actions: {
    increment() {
      this.globalCounter++;
    }
  },
  persist: false,
  // add code below to enable state persistence
  // persist: {
  //   key: 'main-store', // custom storage key
  //   storage: sessionStorage, // use sessionStorage instead of localStorage
  //   paths: ['globalCounter'], // only persist specific state properties
  // }
});
