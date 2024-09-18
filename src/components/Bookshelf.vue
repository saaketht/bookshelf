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

    const sortBooks = () => {
      // Sorting logic is handled in the computed property
    };

    return {
      books,
      sortBy,
      showCoverView,
      useCoverImages,
      groupedBooks,
      goToReader,
      sortBooks
    };
  }
});
</script>

<style scoped>
.bookshelf-container {
  padding: 20px;
}

.bookshelf-controls {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}

.bookshelf-wrapper {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.shelf {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.view-toggle,
.cover-toggle {
  display: flex;
  align-items: center;
}

.view-toggle input,
.cover-toggle input {
  margin-left: 5px;
}
</style>
