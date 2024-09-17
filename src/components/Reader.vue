<template>
  <div class="reader-container">
    <div class="book-content">
      <!-- Example content, replace with actual book content -->
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      <!-- Repeat or dynamically generate content based on the book's text -->
      <!-- Add more content here -->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Reader'
})
</script>

<style scoped>
.reader-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f4f4f4; /* Light background color for better readability */
  padding: 20px;
  box-sizing: border-box;
}

.book-content {
  width: 100%;
  max-width: 800px; /* Limit the maximum width of the book */
  height: 100%;
  max-height: 600px; /* Limit the maximum height of the book */
  overflow-y: auto; /* Enable vertical scrolling */
  background: #fff; /* Background color for the book */
  border: 1px solid #ddd; /* Light border around the book */
  border-radius: 10px; /* Rounded corners for the book */
  padding: 20px; /* Padding inside the book */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Shadow for a subtle 3D effect */
}

.book-content p {
  margin-bottom: 1.5rem; /* Spacing between paragraphs */
  line-height: 1.6; /* Line height for readability */
}
</style>
