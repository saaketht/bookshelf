<template>
  <div
    class="book-spine"
    :class="{ hovered: isHovered }"
    :style="{
      backgroundColor: book.color,
      width: spineWidth + 'px'
    }"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <div v-if="!isHovered || !useCoverImage" class="book-info">
      <span class="book-title">{{ book.title }}</span>
      <span class="book-author">{{ book.author }}</span>
      <span class="book-extra">{{ book.pages }} pgs | pub. {{ book.publishedYear }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, type PropType } from 'vue'
import { type Book } from '@/types/book'

export default defineComponent({
  name: 'BookSpine',
  props: {
    book: {
      type: Object as PropType<Book>,
      required: true
    },
    useCoverImage: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const spineWidth = computed(() => {
      // Base width on number of pages, given min and max
      const min = 50
      const max = 90
      return Math.min(Math.max(min, props.book.pages / 7), max)
    })

    const isHovered = ref(false)

    const handleMouseEnter = () => {
      isHovered.value = true
    }

    const handleMouseLeave = () => {
      isHovered.value = false
    }

    return { spineWidth, isHovered, handleMouseEnter, handleMouseLeave }
  }
})
</script>

<style scoped>
.book-spine {
  height: 250px;
  writing-mode: sideways-lr;
  text-orientation: mixed;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0.5rem 0.25rem;
  color: white;
  font-size: 0.7rem;
  transition: transform 0.3s ease-in-out;
  margin-right: 10px;
  border-radius: 5px;
  box-shadow: -2px 2px 5px rgba(0, 0, 0, 0.3);
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transform-origin: left center;
  z-index: 10;
}

/* Book hover effect: scale with smoother shadow and gradient */
.book-spine:hover {
  transform: scale(1.4);
}

.book-spine:hover::before {
  opacity: 0.6; /* Make gradient more visible */
  transform: scaleX(1.1); /* Slight expansion for emphasis */
}

/* Hovered state: apply flip effect */
.book-spine.hovered {
  transform: rotateY(-90deg);
}

/* Book info (text details) */
.book-info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  padding: 0.5rem 0;
  pointer-events: none;
}

/* Title styles */
.book-title {
  font-weight: bold;
  font-size: 0.9em;
  margin-bottom: 0.5rem;
  /* Improved handling of long titles */
  max-height: 100%;
  pointer-events: none;
}

/* Author styles */
.book-author {
  font-style: italic;
  font-weight: normal;
  font-size: 0.8em;
  margin-bottom: 0.5rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  pointer-events: none;
}

/* Extra info (pages, year) styles */
.book-extra {
  font-size: 0.7em;
  opacity: 0.9;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  pointer-events: none;
}

/* Adjust height for mobile view */
@media (max-width: 600px) {
  .book-spine {
    height: 200px;
  }
}
</style>
