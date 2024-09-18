<template>
  <nav class="navbar">
    <ul class="navbar-list">
      <li><router-link to="/">Bookshelf</router-link></li>
      <li><router-link to="/reader">Reader</router-link></li>
      <!-- Add more links as needed -->
    </ul>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Navbar'
})
</script>

<style scoped>
.navbar {
  width: 100%;
  transform: rotate(90deg); /* Slight rotation for style */
  background-color: #165080; /* Dark background for the navbar */
  padding: 10px 0;
  justify-self: left;
  position-anchor: left;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5); /* Shadow effect */
}

.navbar-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
}

.navbar-list li {
  margin: 0 15px;
}

.navbar-list a {
  color: #f39c12; /* Bright color for links */
  text-decoration: none;
  font-size: 1.2rem;
}

.navbar-list a:hover {
  text-decoration: underline;
}
</style>
