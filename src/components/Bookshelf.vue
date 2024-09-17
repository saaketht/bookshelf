<template>
  <div class="bookshelf-container">
    <div class="bookshelf-controls">
      <label for="sort-select">Sort by: </label>
      <select id="sort-select" v-model="sortBy" @change="sortBooks">
        <option value="title">Title</option>
        <option value="author">Author</option>
        <option value="genre">Genre</option>
        <option value="pages">Pages</option>
        <option value="publishedYear">Year</option>
      </select>
      &nbsp;

      <!-- Toggle between spine and cover view -->
      <label for="view-toggle" class="view-toggle">
        Use cover view:
        <input id="view-toggle" type="checkbox" v-model="showCoverView" />
        &nbsp;
      </label>

      <!-- Toggle for using cover images or not -->
      <label for="cover-toggle" class="cover-toggle">
        Show cover images:
        <input id="cover-toggle" type="checkbox" v-model="useCoverImages" />
      </label>
    </div>

    <!-- Render shelves -->
    <div v-for="(shelfBooks, index) in groupedBooks" :key="index" class="bookshelf-wrapper">
      <div class="shelf">
        <template v-if="!showCoverView">
          <BookSpine
            v-for="book in shelfBooks"
            :key="book.id"
            :book="book"
            :useCoverImage="useCoverImages"
          />
        </template>
        <template v-else>
          <BookCover
            v-for="book in shelfBooks"
            :key="book.id"
            :book="book"
            :useCoverImage="useCoverImages"
          />
        </template>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { type Book } from '@/types/book'
import { mockBooks } from '@/mock/books'
import BookSpine from './BookSpine.vue'
import BookCover from './BookCover.vue'

export default defineComponent({
  name: 'BookshelfMain',
  components: {
    BookSpine,
    BookCover
  },
  setup() {
    const books = ref<Book[]>(mockBooks)
    const sortBy = ref<keyof Book>('title')
    const showCoverView = ref(false)
    const useCoverImages = ref(false)

    const booksPerShelf = 5

    const sortedBooks = computed(() => {
      return [...books.value].sort((a, b) => {
        if (typeof a[sortBy.value] === 'string' && typeof b[sortBy.value] === 'string') {
          return (a[sortBy.value] as string).localeCompare(b[sortBy.value] as string)
        }
        return (a[sortBy.value] as number) - (b[sortBy.value] as number)
      })
    })

    const groupedBooks = computed(() => {
      const shelves = []
      for (let i = 0; i < sortedBooks.value.length; i += booksPerShelf) {
        shelves.push(sortedBooks.value.slice(i, i + booksPerShelf))
      }
      return shelves
    })

    const sortBooks = () => {
      // Sorting is handled by computed
    }

    return {
      sortBy,
      groupedBooks,
      sortBooks,
      showCoverView,
      useCoverImages
    }
  }
})
</script>

<style scoped>
.bookshelf-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.bookshelf-controls {
  margin-bottom: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.view-toggle, .cover-toggle {
  font-size: 0.9rem;
}

.bookshelf-wrapper {
  margin-bottom: 2rem;
}

.shelf {
  display: flex;
  flex-wrap: wrap;
  background: linear-gradient(to bottom, #9e743f, #4a3204); /* Light wood gradient */
  border: 1px solid #44280e; /* Darker wood color for realism */
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3); /* Add shadow for depth */
  position: relative;
  margin-bottom: 20px;
  height: 300px;
  perspective: 1000px;
  transform-style: preserve-3d;
}

.shelf:hover {
  transform: rotateX(-3deg) rotateY(3deg); /* Slight 3D effect on hover */
}

.shelf::before {
  content: '';
  position: absolute;
  top: -15px;
  left: 0;
  right: 0;
  height: 30px;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0)); /* Shadow for the top */
  border-radius: 8px 8px 0 0;
  box-shadow: inset 0 -4px 8px rgba(0, 0, 0, 0.3);
}

.shelf::after {
  content: '';
  position: absolute;
  bottom: -15px;
  left: 0;
  right: 0;
  height: 15px;
  background: linear-gradient(to right, #8b5a2b, #422c10, #3a220b); /* Wood texture effect at the bottom */
  border-radius: 0 0 8px 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.bookshelf-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>

