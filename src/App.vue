<template>
  <div id="app">
    <h1>My Bookshelf</h1>
    <div class="background-selector">
      <label for="background-select">Choose background:</label>
      <select id="background-select" v-model="backgroundType" @change="updateBackground">
        <option value="image">Image</option>
        <option value="color">Solid Color</option>
      </select>
    </div>
    <router-view></router-view>
  </div>
</template>


<script lang="ts">
import { defineComponent, ref, watch } from 'vue'

// Import background image
import backgroundImage from '@/assets/grandlib.png'

export default defineComponent({
  name: 'App',
  setup() {
    const backgroundType = ref<'image' | 'color'>('image')

    // Watch for changes to backgroundType and update the background style accordingly
    watch(backgroundType, (newValue) => {
      if (newValue === 'image') {
        document.body.style.background = `url(${backgroundImage}) no-repeat center center fixed`
        document.body.style.backgroundSize = 'cover'
        document.body.style.backgroundColor = '' // Reset background color
      } else {
        document.body.style.background = ''
        document.body.style.backgroundColor = '#333333' // Example solid color
      }
    }, { immediate: true })

    return {
      backgroundType
    }
  }
})
</script>


<style>
body {
  margin: 0;
  padding: 0;
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
  background: rgba(0, 0, 0, 0.5); /* Semi-transparent background for better readability */
  border-radius: 10px; /* Rounded corners for the app container */
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
  background-color: rgba(28, 28, 28, 0.8); /* Semi-transparent background for content */
}

.background-selector {
  margin-bottom: 1rem;
  color: #ffffff; /* Ensure the dropdown label is readable */
}
</style>
