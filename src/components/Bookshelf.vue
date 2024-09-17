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

    <!-- Render 3 shelves -->
    <div v-for="(shelfBooks, index) in groupedBooks" :key="index" class="bookshelf-wrapper">
      <div class="shelf">
        <BookSpine
          v-for="book in shelfBooks"
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

    const booksPerShelf = 5 // Define how many books per shelf

    const sortedBooks = computed(() => {
      return [...books.value].sort((a, b) => {
        if (typeof a[sortBy.value] === 'string' && typeof b[sortBy.value] === 'string') {
          return (a[sortBy.value] as string).localeCompare(b[sortBy.value] as string)
        }
        return (a[sortBy.value] as number) - (b[sortBy.value] as number)
      })
    })

    // Update groupedBooks to use sortedBooks
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

    const handleBookHover = (book: Book) => {
      console.log('Book hovered:', book.title)
    }

    return {
      sortBy,
      groupedBooks,
      sortBooks,
      handleBookHover
    }
  }
})
</script>


<style scoped>
.body{
  background-color: #5e2c04;
}
.bookshelf-container {
  width: 1200px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.bookshelf-controls {
  margin-bottom: 2rem;
}

.bookshelf-wrapper {
  
  padding: 20px 0;
}

.shelf {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  background-color: #8b4513;
  border-bottom: 15px solid #5e2c04;
  border-right: 5px solid #5e2c04;
  border-left: 15px solid #5e2c04;

  padding: 10px;
  box-shadow: 0 6px 12px rgba(1, 1, 1, 0.8); /* Adjust shadow for depth */
  
  position: relative;
  margin-bottom: -40px; /* Spacing between shelves */
  height: 290px; /* Fixed height for the shelf */
   /* 3D Perspective */
  transition: transform 0.3s ease; /* Smooth transition for 3D effect */
  transform: perspective(1000px)
}

.shelf:hover {
  /* Rotate on hover for 3D effect */
}

.shelf::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 20px;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0));
  border-radius: 5px 5px 0 0;
  box-shadow: inset 0 -4px 8px rgba(0, 0, 0, 0.3); /* Shadow inside shelf */
}

.shelf::after {
  content: '';
  position: absolute;
  bottom: -15px;
  left: 0;
  right: 0;
  height: 15px;
  background: linear-gradient(to right, #5e2c04, #8b4513, #5e2c04);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  border-radius: 0 0 5px 5px;
}

</style>
