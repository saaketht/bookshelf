<template>
  <div
    class="book-spine"
    :style="{
      backgroundColor: book.color,
      width: spineWidth + 'px'
    }"
    @mouseenter="$emit('mouseenter')"
  >
    <div class="book-info">
      <span class="book-title">{{ book.title }}</span>
      <span class="book-author">{{ book.author }}</span>
      <span class="book-extra">{{ book.pages }} pgs | pub. {{ book.publishedYear }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType, computed } from 'vue'
import { type Book } from '@/types/book'

export default defineComponent({
  name: 'BookSpine',
  props: {
    book: {
      type: Object as PropType<Book>,
      required: true
    }
  },
  setup(props) {
    const spineWidth = computed(() => {
      // Base width on number of pages, given min and max
      const min = 30
      const max = 60
      return Math.min(Math.max(min, props.book.pages / 7), max)
    })

    return { spineWidth }
  }
})
</script>

<style scoped>
.book-spine {
  height: 250px;
  writing-mode: vertical-rl;
  text-orientation: mixed;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0.5rem 0.25rem;
  color: white;
  font-size: 0.7rem;
  transition: all 0.3s ease;
  margin-right: 5px;
  box-shadow: -2px 2px 5px rgba(0, 0, 0, 0.3);
  /* border-radius: 0 3px 3px 0; */
  position: relative;
  overflow: hidden;
}

.book-spine::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0));
  opacity: 0;
  transition: opacity 0.3s ease;
}

.book-spine:hover {
  transform: scale(1.05) translateY(-5px);
}

.book-spine:hover::before {
  opacity: 1;
}

.book-info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  padding: 0.5rem 0;
}

.book-title {
  font-weight: bold;
  font-size: 0.9em;
  margin-bottom: 0.5rem;
  /* Improved handling of long titles */
  max-height: 100%;
}

.book-author {
  font-style: italic;
  font-weight: normal;
  font-size: 0.8em;
  margin-bottom: 0.5rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.book-extra {
  font-size: 0.7em;
  opacity: 0.9;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
