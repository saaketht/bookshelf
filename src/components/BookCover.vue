<template>
  <div
    class="book-cover"
    :style="{
      backgroundColor: book.color
    }"
  >
    <div v-if="!useCoverImage" class="book-info">
      <span class="book-title">{{ book.title }}</span>
      <span class="book-author">{{ book.author }}</span>
      <span class="book-extra">{{ book.pages }} pgs | pub. {{ book.publishedYear }}</span>
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
  flex-direction: column;
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
  padding: 0.5rem;
  text-align: center;
}

/* Title styles */
.book-title {
  font-weight: bold;
  font-size: 1em;
  margin-bottom: 0.5rem;
  max-height: 3em;
  overflow: hidden;
  display: -webkit-box;
  line-clamp: 2;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

/* Author styles */
.book-author {
  font-style: italic;
  margin-bottom: 0.5rem;
}

/* Extra info (pages, year) styles */
.book-extra {
  font-size: 0.7em;
  opacity: 0.9;
}

.book-cover-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
