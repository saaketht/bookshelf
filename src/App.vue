<template>
  <div id="app">
    <h1>My Bookshelf</h1>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App'
})
</script>

<style>
body {
  margin: 0;
  padding: 0;
  background: linear-gradient(to right, #1c1c1c, #333333); /* Gradient background */
  font-family: 'Roboto', sans-serif; /* Updated font */
}

#app {
  text-align: center;
  color: #ffffff; /* Text color for better contrast */
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; /* Centering content vertically */
  padding: 20px; /* Adjust padding */
}

h1 {
  font-size: 3rem; /* Larger, more prominent title */
  margin-bottom: 1.5rem; /* Reduced margin */
  font-weight: bold; /* Bold title */
  color: #f39c12; /* Bright color for the title */
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.7); /* Text shadow for better readability */
}

router-view {
  width: 100%;
  max-width: 1200px; /* Limit max width for content */
  padding: 20px; /* Padding for router-view */
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.3); /* Shadow around content */
  border-radius: 10px; /* Rounded corners */
  background-color: #1c1c1c; /* Background color for content */
}
</style>
