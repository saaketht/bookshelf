<template>
  <div class="reader-container">
    <p class="Book-title">{{ book?.title || 'Book Title' }}</p>
    <div class="book">
      <div class="page left-page">
        <p v-html="currentPageContent.left"></p>
        <button class="navigation-button-backward" @click="prevPage" :disabled="currentPage === 1">
          &#9664; <!-- Unicode left arrow -->
        </button>
      </div>
      <div class="page right-page">
        <p v-html="currentPageContent.right"></p>
        <button class="navigation-button-forward" @click="nextPage" :disabled="currentPage === totalPages">
          &#9654; <!-- Unicode right arrow -->
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { type Book } from '@/types/book';
import { mockBooks } from '@/mock/books';

export default defineComponent({
  name: 'Reader',
  props: {
    id: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const route = useRoute();
    const router = useRouter();

    const book = ref<Book | undefined>(undefined);
    const currentPage = ref(1);
    const bookContent = ref<string[]>([]);

    const totalPages = computed(() => {
      return Math.ceil(bookContent.value.length / 2);
    });

    const currentPageContent = computed(() => {
      const leftIndex = (currentPage.value - 1) * 2;
      const rightIndex = leftIndex + 1;
      return {
        left: bookContent.value[leftIndex] || '',
        right: bookContent.value[rightIndex] || ''
      };
    });

    const prevPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--;
      }
    };

    const nextPage = () => {
      if (currentPage.value < totalPages.value) {
        currentPage.value++;
      }
    };

    const loadBook = () => {
      const bookId = props.id;
      book.value = mockBooks.find(b => b.id === bookId);
      if (book.value) {
        // Split the book content into paragraphs
        bookContent.value = book.value.bookContent.flatMap(chapter => 
          chapter.split('\n').filter(paragraph => paragraph.trim() !== '')
        );
        console.log('Loaded book content:', bookContent.value);
      } else {
        console.error('Book not found');
        router.push({ name: 'home' });
      }
    };

    onMounted(() => {
      loadBook();
    });

    watch(() => route.params.id, loadBook);

    watch(bookContent, () => {
      if (currentPage.value > totalPages.value) {
        currentPage.value = totalPages.value;
      }
    });

    return {
      book,
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
  background: linear-gradient(135deg, #000000, #2c3e50); /* Darker background for contrast */
  padding: 20px;
  position: relative; /* Needed for absolute positioning of buttons */
}

.book {
  display: flex;
  max-width: 90vw; /* Adjusted to make the book more prominent */
  height: 80vh; /* Adjusted for better proportion */
  background: linear-gradient(135deg, #000000, #2c3e50);  /* Darker gradient with texture effect */
  border-radius: 15px; /* More rounded corners */
  overflow: hidden;
  color: #f0f0f0; /* Lighter text for better readability */
  font-family: 'Georgia', serif;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.7); /* Shadow for depth */
}

.page {
  flex: 1;
  padding: 30px; /* Increased padding for better spacing */
  overflow-y: auto;
  text-align: justify;
  box-sizing: border-box;
  background: rgba(0, 0, 0, 0.05); /* Slightly transparent background for a subtle texture */
  border: 1px solid rgba(255, 255, 255, 0.1); /* Light border for separation */
  border-radius: 10px; /* Rounded corners for pages */
}

.left-page {
  border-right: 1px solid rgba(255, 255, 255, 0.2); /* Subtle border between pages */
  padding-right: 50px;
}

.right-page {
  padding-left: 50px;
}

.page p {
  margin: 0;
  font-size: 1.2rem; /* Slightly larger font size for better readability */
  line-height: 1.7;
}

.navigation-button-backward,
.navigation-button-forward {
  position: absolute;
  bottom: 150px;
  background: none; /* Remove background */
  color: white;
  border: none; /* Remove border */
  border-radius: 50%; /* Make the button round */
  padding: 0; /* Remove padding */
  font-size: 2rem; /* Larger arrow icons */
  cursor: pointer;
  transition: color 0.3s, transform 0.2s; /* Adjusted transition for color and transform */
  box-shadow: none; /* Remove shadow */
}

.navigation-button-backward:hover,
.navigation-button-forward:hover {
  color: #aaa; /* Change arrow color on hover */
  transform: scale(1.1); /* Slight scale effect on hover */
}

.navigation-button-backward:disabled,
.navigation-button-forward:disabled {
  color: #555; /* Dim color for disabled state */
  cursor: not-allowed;
}

.navigation-button-backward {
  left: 30px; /* Adjusted positioning */
}

.navigation-button-forward {
  right: 30px; /* Adjusted positioning */
}

.Book-title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 20px;
}
</style>
