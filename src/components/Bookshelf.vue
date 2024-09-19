<template>
  <div class="page">
    <div class="bookshelf-container">
      <h1>Book Shelf</h1>
      <div class="bookshelf-controls">
        <label for="sort-select">Sort by:&nbsp;</label>
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
              @click="goToReader(book)" 
            />
          </template>
          <template v-else>
            <BookCover
              v-for="book in shelfBooks"
              :key="book.id"
              :book="book"
              :useCoverImage="useCoverImages"
              @click="goToReader(book)" 
            />
          </template>
        </div>
      </div>
      
    </div>
    <div class="Desk">
      <h2>Desk</h2>
      <label for="desk-select">Add to Desk:</label>
      <select id="desk-select" v-model="selectedBookId" @change="addBookToDesk">
        <option disabled value="">Select a book</option>
        <option v-for="book in books" :key="book.id" :value="book.id">{{ book.title }}</option>
      </select>

      <div v-if="deskBook" class="desk-book-display">
        <BookCover :book="deskBook" :useCoverImage="true" />
        <div class="book-details">
          <p><strong>Title:</strong> {{ deskBook.title }}</p>
          <p><strong>Author:</strong> {{ deskBook.author }}</p>
          <p><strong>Pages Read:</strong></p>
          <p><strong>Pages:</strong> {{ deskBook.pages }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { type Book } from '@/types/book';
import { mockBooks } from '@/mock/books';
import BookSpine from './BookSpine.vue';
import BookCover from './BookCover.vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'BookshelfMain',
  components: {
    BookSpine,
    BookCover
  },
  setup() {
    const books = ref<Book[]>(mockBooks);
    const sortBy = ref<keyof Book>('title');
    const showCoverView = ref(true);
    const useCoverImages = ref(true);
    const selectedBookId = ref<string>('');
    const deskBook = ref<Book | null>(null);
    const router = useRouter();

    const booksPerShelf = 5;

    const sortedBooks = computed(() => {
      return [...books.value].sort((a, b) => {
        if (typeof a[sortBy.value] === 'string') {
          return (a[sortBy.value] as string).localeCompare(b[sortBy.value] as string);
        } else if (typeof a[sortBy.value] === 'number') {
          return (a[sortBy.value] as number) - (b[sortBy.value] as number);
        }
        return 0;
      });
    });

    const groupedBooks = computed(() => {
      const shelves = [];
      for (let i = 0; i < sortedBooks.value.length; i += booksPerShelf) {
        shelves.push(sortedBooks.value.slice(i, i + booksPerShelf));
      }
      return shelves;
    });

    const goToReader = (book: Book) => {
      router.push({ name: 'ReaderView', params: { id: book.id } });
    };

    const addBookToDesk = () => {
      deskBook.value = books.value.find(book => book.id === selectedBookId.value) || null;
    };

    return {
      books,
      sortBy,
      showCoverView,
      useCoverImages,
      groupedBooks,
      goToReader,
      selectedBookId,
      deskBook,
      addBookToDesk
    };
  }
});
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

.view-toggle,
.cover-toggle {
  font-size: 0.9rem;
}

.bookshelf-wrapper {
  overflow-x: auto;
  margin-bottom: 1rem;
}

.shelf::before {
  content: '';
  position: absolute;
  top: -15px;
  left: 0;
  right: 0;
  height: 30px;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.3),
    rgba(0, 0, 0, 0)
  ); /* Shadow for the top */
  border-radius: 8px 8px 0 0;
  box-shadow: inset 0 -4px 8px rgba(0, 0, 0, 0.3);
}

.shelf {
  display: inline-flex;
  background: linear-gradient(to bottom, #9e743f, #4a3204); /* Light wood gradient */
  border: 1px solid #44280e; /* Darker wood color for realism */
  padding: 20px;
  position: relative;
  margin-bottom: 14px;
  height: 100%;
  perspective: 1000px;
  transform-style: preserve-3d;
}

.shelf::after {
  content: '';
  position: absolute;
  bottom: -15px;
  left: 0;
  right: 0;
  height: 15px;
  background: linear-gradient(
    to right,
    #8b5a2b,
    #422c10,
    #3a220b
  ); /* Wood texture effect at the bottom */
  border-radius: 0 0 8px 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.bookshelf-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.Desk {
  width: 100%;
  height: 500px;
  background: linear-gradient(to bottom, #4a3204, #9e743f); /* Desk gradient */
  border: 1px solid #44280e; /* Darker wood color for realism */
  border-top: none;
  border-radius: 0 0 8px 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  margin-top: 14px;
  position: relative;
}
.desk-book-display {
  display: flex;
  margin-top: 20px;
  margin-left: 20px;
}

.book-details {
  margin-left: 20px;
  font-size: 1rem;
}

</style>