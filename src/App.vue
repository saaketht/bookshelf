<template>
  <div id="app">
    <h1>My Bookshelf</h1>
    <div class="background-selector">
      <label for="background-select">Choose background: </label>
      <select id="background-select" v-model="backgroundType">
        <option value="color">Solid</option>
        <option value="image">Image</option>
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
    const backgroundType = ref<'color' | 'image'>('color')

    // Watch for changes to backgroundType and update the background style accordingly
    watch(
      backgroundType,
      (newValue) => {
        if (newValue === 'image') {
          document.body.style.background = `url(${backgroundImage}) no-repeat center center fixed`
          document.body.style.backgroundSize = 'cover'
          document.body.style.backgroundColor = '' // Reset background color
        } else {
          document.body.style.background = ''
          document.body.style.backgroundColor = '#333333' // Example solid color
        }
      },
      { immediate: true }
    )

    return {
      backgroundType
    }
  }
})
</script>

<style>
body {
  margin: 1rem;
  padding: 0;
  background-color: #f0f0f0;
}

#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /* color: #2c3e50; light mode font color */
  color: #f0f0f0; /* dark mode font color */
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 20px;
  background: rgba(0, 0, 0, 0.3); /* dark mode */
  border-radius: 10px; /* Rounded corners for the app container */
}

h1 {
  margin-bottom: 1rem;
  font-weight: lighter;
  color: #f0f0f0; /* Bright color for the title */
}

.background-selector {
  color: #ffffff; /* Ensure the dropdown label is readable */
}
</style>
