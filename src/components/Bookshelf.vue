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
    </div>
    <div class="bookshelf-wrapper">
      <div class="shelf">
        <BookSpine
          v-for="book in sortedBooks"
          :key="book.id"
          :book="book"
          @mouseenter="handleBookHover(book)"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { type Book } from '@/types/book'
import { mockBooks } from '@/mock/books'
import BookSpine from './BookSpine.vue'

export default defineComponent({
  name: 'Bookshelf-main',
  components: {
    BookSpine
  },
  setup() {
    const books = ref<Book[]>(mockBooks)
    const sortBy = ref<keyof Book>('title')

    const sortedBooks = computed(() => {
      return [...books.value].sort((a, b) => {
        if (typeof a[sortBy.value] === 'string' && typeof b[sortBy.value] === 'string') {
          return (a[sortBy.value] as string).localeCompare(b[sortBy.value] as string)
        }
        return (a[sortBy.value] as number) - (b[sortBy.value] as number)
      })
    })

    const sortBooks = () => {
      // This function is called when the sort option changes
      // The actual sorting is handled by the computed property
    }

    const handleBookHover = (book: Book) => {
      console.log('Book hovered:', book.title)
      // We'll implement the cover display effect later
    }

    return {
      sortBy,
      sortedBooks,
      sortBooks,
      handleBookHover
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
}

.bookshelf-controls {
  margin-bottom: 2rem;
}

.bookshelf-wrapper {
  overflow-x: auto;
  padding: 20px 0;
}

.shelf {
  display: inline-flex;
  background-color: #8b4513;
  border-bottom: 15px solid #5e2c04;
  padding: 10px 10px 0;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  position: relative;
}

.shelf::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 20px;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0));
}

.shelf::after {
  content: '';
  position: absolute;
  bottom: -15px;
  left: 0;
  right: 0;
  height: 15px;
  background: linear-gradient(to right, #5e2c04, #8b4513, #5e2c04);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}
</style>
