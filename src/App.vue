<template>
  <div id="app">
    <!-- Collapsible Sidebar -->
    <div :class="['sidebar', { open: isSidebarOpen }]">
      <ul class="navbar-list">
        <li><router-link to="/">Bookshelf</router-link></li>
        <li><router-link to="/reader">Reader</router-link></li>
        <!-- Add more links as needed -->
      </ul>
    </div>

    <!-- Button to manually toggle the sidebar (optional) -->
    

    

    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeUnmount } from 'vue'

export default defineComponent({
  name: 'App',
  setup() {
    const isSidebarOpen = ref(false) // Sidebar state

    const toggleSidebar = () => {
      isSidebarOpen.value = !isSidebarOpen.value // Toggle sidebar visibility
    }

    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === 'q') {
        toggleSidebar() // Toggle sidebar on Ctrl + Q
      }
    }

    onMounted(() => {
      // Listen for keydown events
      window.addEventListener('keydown', handleKeyPress)
    })

    onBeforeUnmount(() => {
      // Remove event listener when component is destroyed
      window.removeEventListener('keydown', handleKeyPress)
    })

    return {
      isSidebarOpen,
      toggleSidebar
    }
  }
})
</script>

<style>
body {
  margin: 0;
  padding: 0;
  font-family: 'Roboto', sans-serif;
  background-color: linear-gradient(135deg, #2980b9, #2c3e50);
}

#app {
  text-align: center;
  color: #ffffff;
  min-height: 100vh;
  display: flex;
  min-width: 100vw;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background:linear-gradient(135deg, #000000, #2c3e50);
  border-radius: 10px;
}

h1 {
  font-size: 3rem;
  margin-bottom: 1.5rem;
  font-weight: bold;
  color: #fffdf9;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.7);
}

router-view {
  width: 100%;
  padding: 20px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  background-color: rgba(28, 28, 28, 0.8);
}

/* Collapsible Sidebar styles */
.sidebar {
  position: fixed;
  left: -250px; /* Sidebar is hidden */
  top: 0;
  width: 250px;
  height: 100%;
  background:linear-gradient(135deg, #000000, #2c3e50);
  padding: 20px;
  transition: left 0.3s ease; /* Smooth transition */
  z-index: 1000;;
}

.sidebar.open {
  left: 0; /* Sidebar visible when open */
}

.navbar-list {
  list-style: none;
  padding: 0;
}

.navbar-list li {
  margin-bottom: 15px;
}

.navbar-list a {
  color: #ffffff;
  text-decoration: none;
  font-size: 1.2rem;
}



.toggle-btn {
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: #000000;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
}

.toggle-btn:hover {
  background-color: #e67e22;
}
</style>
