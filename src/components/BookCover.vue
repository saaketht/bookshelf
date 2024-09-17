<template>
  <div
    class="book-cover"
    :style="{
      backgroundColor: book.color
    }"
  >
    <div v-if="!useCoverImage" class="book-info">
      <div class="book-title">{{ book.title }}</div>
      <div class="book-author">{{ book.author }}</div>
      <div class="book-extra">{{ book.pages }} pgs | pub. {{ book.publishedYear }}</div>
    </div>
    <img v-if="useCoverImage" :src="book.coverUrl" alt="Book Cover" class="book-cover-img" />
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import { type Book } from '@/types/book'

export default defineComponent({
  name: 'BookCover',
  props: {
    book: {
      type: Object as PropType<Book>,
      required: true
    },
    useCoverImage: {
      type: Boolean,
      default: false
    }
  }
})
</script>

<style scoped>
/* Book cover styles */
.book-cover {
  height: 250px;
  margin-right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 0.8rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  overflow: hidden;
  transition: transform 0.3s ease;
}

.book-cover:hover {
  transform: scale(1.05);
}

/* Book info (text details) */
.book-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 1rem;
  text-align: center;
}

/* Title styles */
.book-title {
  font-weight: bold;
  font-size: 1.2em;
  margin-bottom: 0.5rem;
  max-height: 3em;
}

/* Author styles */
.book-author {
  font-style: italic;
  margin-bottom: 0.3rem;
}

/* Extra info (pages, year) styles */
.book-extra {
  font-size: 0.8em;
  opacity: 0.9;
}

.book-cover-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
