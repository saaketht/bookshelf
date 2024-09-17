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
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'App',
  setup() {
    const backgroundType = ref<'image' | 'color'>('image')


    const updateBackground = () => {
      // Trigger a watch to apply background styles
      backgroundType.value
    }

    return {
      backgroundType,
      updateBackground,
    }
  }
})
</script>

<style>
body {
  margin: 0;
  padding: 0;
  font-family: 'Roboto', sans-serif;
}

#app {
  text-align: center;
  color: #ffffff;
  min-height: 100vh;
  display: flex;
  width: 100vw;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
}

h1 {
  font-size: 3rem;
  margin-bottom: 1.5rem;
  font-weight: bold;
  color: #f39c12;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.7);
}

router-view {
  width: 100%;
  padding: 20px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  background-color: rgba(28, 28, 28, 0.8);
}

.background-selector {
  margin-bottom: 1rem;
  color: #ffffff;
}

button {
  margin-top: 1.5rem;
  padding: 10px 20px;
  background-color: #f39c12;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.2rem;
}

button:hover {
  background-color: #e67e22;
}
</style>
