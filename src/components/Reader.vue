<template>
  

  <div class="reader-container">
    <div class="book">
      <div class="page left-page">
        <!-- Left page content -->
        <p>{{ currentPageContent.left }}</p>
      </div>
      <div class="page right-page">
        <!-- Right page content -->
        <p>{{ currentPageContent.right }}</p>
      </div>
    </div>

    <div class="navigation-buttons">
      <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
      <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'Reader',
  setup() {
    const router = useRouter();

    const goToBookShelf = () => {
      router.push({ name: 'home' });
    };

    // Example content for pages, replace with actual book content
    const bookContent = ref([
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
      'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...',
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat...',
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur...',
      'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum...'
      // Add more content as needed
    ]);

    const currentPage = ref(1); // Current page (1-based index)
    const totalPages = Math.ceil(bookContent.value.length / 2); // Total number of pages (2 pages per view)

    const currentPageContent = ref({
      left: bookContent.value[0] || '',
      right: bookContent.value[1] || ''
    });

    const updatePageContent = () => {
      const leftIndex = (currentPage.value - 1) * 2;
      const rightIndex = leftIndex + 1;
      currentPageContent.value = {
        left: bookContent.value[leftIndex] || '',
        right: bookContent.value[rightIndex] || ''
      };
    };

    const prevPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--;
        updatePageContent();
      }
    };

    const nextPage = () => {
      if (currentPage.value < totalPages) {
        currentPage.value++;
        updatePageContent();
      }
    };

    return {
      goToBookShelf,
      currentPageContent,
      currentPage,
      totalPages,
      prevPage,
      nextPage
    };
  }
});
</script>

<style scoped>
.reader-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background: none;
  padding: 20px;
}

.book {
  display: flex;
  max-width: 80vw;
  min-width: 80vw;
  height: 100vh;
  background: linear-gradient(90deg, #f7e4c3, #7d7171 50%, #7d7171 50%, #f7e4c3); /* Simulate book binding */
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  overflow: hidden;
  color:black;
  font-family: 'Georgia', serif;
}

.page {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  
  border: 1px solid #ddd;
}

.left-page {
  border-right: none; /* Remove the border on the right side of the left page */
}

.right-page {
  border-left: none; /* Remove the border on the left side of the right page */
}

.page p {
  margin: 0;
  font-size: 1.1rem;
  line-height: 1.8;
}

.navigation-buttons {
  margin-top: 20px;
}

.navigation-buttons button {
  background-color: #f39c12;
  color: white;
  border: none;
  padding: 10px 20px;
  margin: 0 10px;
  font-size: 1.2rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.navigation-buttons button:hover {
  background-color: #e67e22;
}

.navigation-buttons button:disabled {
  background-color: #bbb;
  cursor: not-allowed;
}

.back-button {
  position: absolute;
  top: 20px;
  left: 20px;
  padding: 10px 15px;
  background-color: #f39c12;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
}

.back-button:hover {
  background-color: #e67e22;
}
</style>
