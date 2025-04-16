<template>
    <div>
      <h1>Home</h1>
      <p>Reactive counter using global pinia store: {{ store.globalCounter }}</p>
      <button @click="store.increment">+1</button>

    </div>
  </template>
  
  <script setup>
  import { useMainStore } from './store';
  
  const store = useMainStore();

  </script>
